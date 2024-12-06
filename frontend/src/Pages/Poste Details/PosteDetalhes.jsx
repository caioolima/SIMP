import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Principal from '../../components/principal';
import Footer from '../../components/home/Footer';
import styles from './posteDetalhes.module.css';

function PosteDetalhes() {
  const { nomePoste } = useParams(); // Pega o nome do poste da URL
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    // Buscar detalhes do poste com o nome
    fetch(`https://simp-a3.onrender.com/api/alertas/nome/${nomePoste}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar detalhes do poste');
        }
        return response.json();
      })
      .then((data) => {
        setPostDetails(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes do poste:', error);
      });
  }, [nomePoste]);

  return (
    <div>
    <Principal />
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Poste: {nomePoste}</h1>
        {postDetails ? (
          <div className={styles.detailsCard}>
            <div className={styles.infoSection}>
              <p>
                <span className={styles.label}>Status:</span> {postDetails.status}
              </p>
              <p>
                <span className={styles.label}>Localização:</span>{' '}
                {postDetails.endereco}
              </p>
              <p>
                <span className={styles.label}>Grau de Inclinação:</span>{' '}
                {postDetails.grau_inclinacao}°
              </p>
              <p>
                <span className={styles.label}>Última Atualização:</span>{' '}
                {new Date(postDetails.data_hora).toLocaleString()}
              </p>
            </div>
            <div className={styles.mapSection}>
              <iframe
                title="Mapa do Poste"
                className={styles.map}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  postDetails.endereco
                )}&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          <div className={styles.loading}>
            <p>Carregando os detalhes do poste...</p>
          </div>
        )}
      </div>
    </div>
    <Footer />
  </div>  
  );
}

export default PosteDetalhes;
