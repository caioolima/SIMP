import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig"; 
import styles from './Formulario.module.css'; // Importando o CSS Module
import Principal from '../components/principal';
import Footer from '../components/home/Footer';

const FormularioTeste = () => {
  const [formData, setFormData] = useState({
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    complemento: "",
    status: "selecione", // Alterado para "selecione"
  });

  const [imagem, setImagem] = useState(null); // Para armazenar o arquivo de imagem
  const [imagemUrl, setImagemUrl] = useState(""); // Para armazenar a URL da imagem
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para buscar o endereço baseado no CEP
  const fetchEnderecoByCep = async (cep) => {
    if (cep.length === 9) {  // Verifica se o CEP está completo (no formato 00000-000)
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        // Verifica se a API retornou um erro
        if (data.erro) {
          setError("CEP não encontrado.");
          return;
        }

        // Atualiza o estado com os dados retornados pela API
        setFormData((prevData) => ({
          ...prevData,
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      } catch (err) {
        setError("Erro ao consultar o CEP: " + err.message);
      }
    }
  };

  // Função para lidar com a mudança no campo CEP
  const handleCepChange = (e) => {
    const cep = e.target.value;
    setFormData({ ...formData, cep });
    fetchEnderecoByCep(cep); // Chama a função para buscar o endereço
  };

  // Função para lidar com a imagem
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
  };

  // Função para remover a imagem
  const handleRemoveImage = () => {
    setImagem(null); // Limpar o estado da imagem
    document.getElementById('imagem').value = ""; // Limpar o valor do input de arquivo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Verifica se o status está no valor "selecione"
    if (formData.status === "selecione") {
      setError("Por favor, selecione um status válido.");
      return;
    }

    // Primeiro, envie a imagem para o Firebase Storage e obtenha a URL
    let urlImagem = "";

    if (imagem) {
      try {
        // Criar um nome único para a imagem
        const imageRef = ref(storage, `imagens/${Date.now()}_${imagem.name}`);
        const snapshot = await uploadBytes(imageRef, imagem);
        urlImagem = await getDownloadURL(snapshot.ref); // Obter a URL da imagem
      } catch (err) {
        setError("Erro ao fazer upload da imagem: " + err.message);
        return; // Se o upload falhar, sai da função
      }
    }

    // Agora, envie os dados do formulário, incluindo a URL da imagem, para o servidor
    const dataToSend = {
      ...formData,
      status: "aguardando verificação", // Ajusta o status antes de enviar
      imagemUrl: urlImagem, // Adiciona a URL da imagem ao objeto de dados
    };

    try {
      const response = await fetch("https://simp-a3.onrender.com/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar o formulário.");
      }

      const data = await response.json();
      setSuccessMessage("Formulário criado com sucesso!"); // Exibe a mensagem de sucesso
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.formularioContainer}>
      <Principal />
      <h1 className={styles.h1}>Reporte um problema, <br />a SIMP te ajuda!</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>
            CEP:
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleCepChange} // Altere o onChange para handleCepChange
              required
              className={styles.input}
              placeholder="00000-000"
            />
          </label>
          <span id="cepInfo" className={styles.cepInfo}>
            Insira o CEP no formato: 00000-000
          </span>
        </div>
        <div>
          <label>
            Rua:
            <input
              type="text"
              name="rua"
              value={formData.rua}
              onChange={handleChange}
              className={styles.input}
              disabled
            />
          </label>
        </div>
        <div>
          <label>
            Bairro:
            <input
              type="text"
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
              className={styles.input}
              disabled
            />
          </label>
        </div>
        <div>
          <label>
            Cidade:
            <input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              className={styles.input}
              disabled
            />
          </label>
        </div>
        <div>
          <label>
            Estado:
            <input
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className={styles.input}
              disabled
            />
          </label>
        </div>
        <div>
          <label>
            Complemento:
            <input
              type="text"
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
        </div>
        <div>
          <label>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className={styles.input}
            >
              <option value="selecione">Selecione o status</option>
              <option value="alerta">Alerta</option>
              <option value="critico">Crítico</option>
            </select>
          </label>
        </div>

        {/* Input para a imagem */}
        <div>
          {!imagem ? (
            <label htmlFor="imagem" className={styles.inputFileLabel}>
              Selecione uma imagem
            </label>
          ) : (
            <button
              type="button"
              className={styles.removeImageButton}
              onClick={handleRemoveImage}
            >
              Remover imagem
            </button>
          )}
          <input
            type="file"
            id="imagem"
            className={styles.inputFile}
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        {/* Pré-visualização da imagem */}
        {imagem && (
          <div className={styles.previewContainer}>
            <img
              src={URL.createObjectURL(imagem)}
              alt="Preview"
              className={styles.previewImage}
            />
            <p className={styles.fileName}>{imagem.name}</p>
          </div>
        )}

        <button type="submit" className={styles.buttonSubmit}>
          Enviar
        </button>

        {/* Exibe a mensagem de sucesso ou erro abaixo do botão */}
        {error && <p className={styles.errorMessage}>{error}</p>}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      </form>

      <Footer />
    </div>
  );
};

export default FormularioTeste;
