import React from 'react';
import { FaMapMarkerAlt, FaChartLine, FaTools } from 'react-icons/fa';
import styles from './styles/Home.module.css';

const Features = () => (
  <section className={styles.features}>
    <h3 className={styles.featuresTitle}>Principais Funcionalidades</h3>
    <div className={styles.featureCards}>
      <div className={styles.featureCard}>
        <FaMapMarkerAlt className={styles.featureIcon} />
        <h4>Monitoramento Geolocalizado</h4>
        <p>Todos os postes monitorados são mapeados, permitindo um rastreamento detalhado e preciso de sua localização e condição.</p>
      </div>
      <div className={styles.featureCard}>
        <FaChartLine className={styles.featureIcon} />
        <h4>Relatórios de Desempenho</h4>
        <p>A plataforma gera relatórios detalhados de desempenho dos postes, analisando tendências e identificando áreas de risco.</p>
      </div>
      <div className={styles.featureCard}>
        <FaTools className={styles.featureIcon} />
        <h4>Manutenção Proativa</h4>
        <p>A detecção precoce de problemas permite que a manutenção seja realizada de forma proativa, evitando falhas mais graves.</p>
      </div>
    </div>
  </section>
);

export default Features;
