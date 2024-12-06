import React from 'react';
import styles from './modal.module.css';

function Modal({ show, onClose, details }) {
  if (!show) return null;

  // Criando o link do Google Maps com o endereço completo
  const address = `${details.rua}, ${details.bairro}, ${details.cidade}, ${details.estado}, ${details.cep}`;
  const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2 className={styles.modalTitle}>Detalhes do Chamado</h2>
        <p className={styles.pModal}><strong>CEP:</strong> {details.cep}</p>
        <p className={styles.pModal}><strong>Rua:</strong> {details.rua || 'Não especificado.'}</p>
        <p className={styles.pModal}><strong>Bairro:</strong> {details.bairro || 'Não especificado.'}</p>
        <p className={styles.pModal}><strong>Cidade:</strong> {details.cidade || 'Não especificado.'}</p>
        <p className={styles.pModal}><strong>Estado:</strong> {details.estado || 'Não especificado.'}</p>
        <p className={styles.pModal}><strong>Complemento:</strong> {details.complemento || 'Não especificado.'}</p>
        <p className={styles.pModal}><strong>Status:</strong> {details.status}</p>
        <p className={styles.pModal}><strong>Imagem anexada:</strong></p>
        {details.imagemUrl ? (
          <p>
            <img src={details.imagemUrl} alt="Imagem do formulário" className={styles.formImage} />
          </p>
        ) : (
          <p className={styles.pModal}>Não especificado.</p>
        )}
        <p className={styles.pModal}><strong>Solicitação feita:</strong> {new Date(details.createdAt).toLocaleString()}</p>

        {/* Embed do Google Maps */}
        <p className={styles.pModal}><strong>Localização:</strong></p>
        <iframe
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: 0 }}
          src={googleMapsLink}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Modal;
