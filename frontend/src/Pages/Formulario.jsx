import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import styles from './Formulario.module.css'; 
import Principal from '../components/principal';
import Footer from '../components/home/Footer';
import { 
  MapPin, 
  ShieldAlert, 
  Camera, 
  Send, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Map,
  X,
  UploadCloud
} from 'lucide-react';

const FormularioTeste = () => {
  const [formData, setFormData] = useState({
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    complemento: "",
    status: "selecione",
  });

  const [imagem, setImagem] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchEnderecoByCep = async (cep) => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        if (data.erro) {
          setError("CEP não encontrado.");
          return;
        }
        setFormData((prevData) => ({
          ...prevData,
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        }));
        setError("");
      } catch (err) {
        setError("Erro na conexão com o serviço de CEP.");
      }
    }
  };

  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    if (value.length <= 9) {
      setFormData({ ...formData, cep: value });
      if (value.replace(/\D/g, "").length === 8) {
        fetchEnderecoByCep(value);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
  };

  const handleRemoveImage = () => {
    setImagem(null);
    document.getElementById('imagem').value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (formData.status === "selecione") {
      setError("Por favor, selecione a severidade do incidente.");
      setLoading(false);
      return;
    }

    let urlImagem = "";
    if (imagem) {
      try {
        const imageRef = ref(storage, `imagens/${Date.now()}_${imagem.name}`);
        const snapshot = await uploadBytes(imageRef, imagem);
        urlImagem = await getDownloadURL(snapshot.ref);
      } catch (err) {
        setError("Falha no upload da imagem técnica.");
        setLoading(false);
        return;
      }
    }

    const dataToSend = {
      ...formData,
      status: "aguardando verificação",
      imagemUrl: urlImagem,
    };

    try {
      const response = await fetch("https://simp-a3.onrender.com/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Erro ao registrar no banco de dados.");

      setSuccessMessage("RELATÓRIO DE CAMPO TRANSMITIDO COM SUCESSO.");
      setFormData({
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        complemento: "",
        status: "selecione",
      });
      setImagem(null);
      document.getElementById('imagem').value = "";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Principal />
      
      <main className={styles.mainContainer}>
        {/* Header Section */}
        <div className={styles.pageHeader}>
           <div className={styles.badge}>v2.5 PROFESSIONAL</div>
           <h1 className={styles.title}>Relatório de Inspeção de Campo</h1>
           <p className={styles.subtitle}>Registre incidentes técnicos para despacho imediato da equipe de suporte.</p>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.form}>
            
            {/* Seção 1: Localização */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <MapPin size={18} /> <h2>Dados de Localização</h2>
              </div>
              
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label><Search size={14} /> CEP</label>
                  <input
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleCepChange}
                    required
                    placeholder="00000-000"
                  />
                </div>
                <div className={styles.inputGroup} style={{ flex: 2 }}>
                  <label><Map size={14} /> Logradouro</label>
                  <input
                    type="text"
                    name="rua"
                    value={formData.rua}
                    onChange={handleChange}
                    placeholder="Nome da Via"
                  />
                </div>
              </div>

              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label>Bairro</label>
                  <input
                    type="text"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputGroup} style={{ maxWidth: '80px' }}>
                  <label>UF</label>
                  <input
                    type="text"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Ponto de Referência / Complemento</label>
                <input
                  type="text"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  placeholder="Ex: Próximo ao poste 042"
                />
              </div>
            </div>

            {/* Seção 2: Classificação */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <ShieldAlert size={18} /> <h2>Classificação de Incidente</h2>
              </div>
              <div className={styles.inputGroup}>
                <label>Severidade Estimada</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="selecione">SELECIONAR GRAVIDADE</option>
                  <option value="alerta">ALERTA PADRÃO [BAIXO]</option>
                  <option value="critico">CRÍTICO [ALTA PRIORIDADE]</option>
                </select>
              </div>
            </div>

            {/* Seção 3: Evidência */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <Camera size={18} /> <h2>Evidência Visual</h2>
              </div>
              
              {!imagem ? (
                <div className={styles.uploadArea}>
                  <input
                    type="file"
                    id="imagem"
                    className={styles.hiddenInput}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <label htmlFor="imagem" className={styles.uploadLabel}>
                    <UploadCloud size={32} />
                    <span>Upload de Foto Técnica</span>
                    <small>Arraste ou clique para selecionar</small>
                  </label>
                </div>
              ) : (
                <div className={styles.previewCard}>
                  <img src={URL.createObjectURL(imagem)} alt="Preview" />
                  <div className={styles.previewInfo}>
                    <span>{imagem.name}</span>
                    <button type="button" onClick={handleRemoveImage} className={styles.removeBtn}>
                      <X size={14} /> REMOVER
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Feedback & Submit */}
            <div className={styles.footer}>
              {error && (
                <div className={styles.errorBox}>
                  <AlertCircle size={16} /> {error}
                </div>
              )}
              {successMessage && (
                <div className={styles.successBox}>
                  <CheckCircle2 size={16} /> {successMessage}
                </div>
              )}

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "PROCESSANDO TRANSMISSÃO..." : (
                  <>REGISTRAR OCORRÊNCIA EM CAMPO <Send size={18} /></>
                )}
              </button>
            </div>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FormularioTeste;
