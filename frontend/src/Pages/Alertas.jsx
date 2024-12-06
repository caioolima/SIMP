import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import Principal from '../components/principal';
import Footer from '../components/home/Footer';
import Modal from '../components/Alertas e Formulário/modal'; // Importar o componente Modal
import styles from './Alertas.module.css';

function Alertas() {
  const [alertas, setAlertas] = useState([]);
  const [formularios, setFormularios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null); // Estado para armazenar o chamado selecionado
  const [modalVisible, setModalVisible] = useState(false); // Controla a exibição do modal
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    // Buscar alertas
    fetch('https://simp-a3.onrender.com/api/alertas')
      .then((response) => response.json())
      .then((data) => {
        setAlertas(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar alertas:', error);
      });

    // Buscar formulários
    fetch('https://simp-a3.onrender.com/api/form')
      .then((response) => response.json())
      .then((data) => {
        setFormularios(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar formulários:', error);
        setLoading(false);
      });
  }, []);

  const openModal = (form) => {
    setSelectedForm(form); // Define o formulário selecionado
    setModalVisible(true); // Torna o modal visível
  };

  const closeModal = () => {
    setModalVisible(false); // Fecha o modal
  };

  const goToPostePage = (nomePoste) => {
    // Navegar para a página do poste usando o nome
    navigate(`/poste/${encodeURIComponent(nomePoste)}`);
  };

  return (
    <div><Principal />
      <div className={styles.content}>
        <div className={styles.alertasContainer}>

          <h1 className={styles.alertasTitle}>Alertas de Poste Inclinado</h1>

          {loading ? (
            <p className={styles.loader}>Carregando...</p>
          ) : (
            <>
              <h2 className={styles.subTitle}>Lista de Alertas</h2>
              {alertas.length === 0 ? (
                <p className={styles.noData}>Nenhum alerta encontrado.</p>
              ) : (
                <ul className={styles.alertList}>
                  {alertas.map((alerta) => (
                    <li key={alerta._id} className={styles.alertItem}>
                      <p className={styles.alertText}>
                        <strong>Nome:</strong> {alerta.nome}
                      </p>
                      <p className={styles.alertText}>
                        <strong>Status:</strong> {alerta.status}
                      </p>
                      <p className={styles.alertText}>
                        <strong>Localização:</strong> {alerta.endereco}
                      </p>
                      <p className={styles.alertText}>
                        <strong>Grau de Inclinação:</strong> {alerta.grau_inclinacao}°
                      </p>
                      <p className={styles.alertText}>
                        <strong>Data:</strong> {new Date(alerta.data_hora).toLocaleString()}
                      </p>
                      <button
                        onClick={() => goToPostePage(alerta.nome)} // Navegar para a página do poste
                        className={styles.detailButton}
                      >
                        Ver Detalhes
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <h2 className={styles.subTitle}>Lista de Chamados</h2>
              {formularios.length === 0 ? (
                <p className={styles.noData}>Nenhum formulário encontrado.</p>
              ) : (
                <ul className={styles.alertList}>
                  {formularios.map((formulario) => (
                    <li
                      key={formulario._id}
                      className={styles.alertItem}
                    >
                      <p className={styles.alertText}>
                        <strong>Bairro:</strong> {formulario.bairro || 'Não especificado.'}
                      </p>
                      <p className={styles.alertText}>
                        <strong>Status:</strong> {formulario.status || 'Não especificado.'}
                      </p>
                      <p className={styles.alertText}>
                        <strong>Solicitação feita:</strong> {new Date(formulario.createdAt).toLocaleString()}
                      </p>
                      <button
                        onClick={() => openModal(formulario)}
                        className={styles.detailButton}
                      >
                        Ver detalhes
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal de Detalhes */}
      <Modal show={modalVisible} onClose={closeModal} details={selectedForm} />

      <Footer className={styles.footerTwo} />
    </div>
  );
}

export default Alertas;
