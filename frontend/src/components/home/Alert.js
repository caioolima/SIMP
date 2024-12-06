import React, { useEffect, useState } from 'react';
import { FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import styles from './styles/Home.module.css';

const Alerts = () => {
  const [recentCases, setRecentCases] = useState([]);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar dados da API
  const fetchAlerts = async () => {
    try {
      const [recentCasesResponse, activeAlertsResponse] = await Promise.all([
        fetch('https://simp-a3.onrender.com/api/alertas/criticos'),
        fetch('https://simp-a3.onrender.com/api/alertas/em-alerta'),
      ]);

      if (!recentCasesResponse.ok || !activeAlertsResponse.ok) {
        throw new Error('Erro ao buscar os dados');
      }

      const recentCasesData = await recentCasesResponse.json();
      const activeAlertsData = await activeAlertsResponse.json();

      setRecentCases(recentCasesData);
      setActiveAlerts(activeAlertsData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  if (loading) return <p>Carregando alertas...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <section className={styles.alerts}>
      <h3 className={styles.alertsTitle}>Alertas e Casos Recentes</h3>
      <div className={styles.alertCards}>
        {/* Card de Casos de Risco */}
        <div className={styles.alertCard}>
          <FaShieldAlt className={styles.alertIcon} />
          <h4>Casos de Risco</h4>
          <ul>
            {activeAlerts.length > 0 ? (
              activeAlerts.map((alertItem) => (
                <li key={alertItem._id}>
                  <strong>{alertItem.nome}</strong> - {alertItem.endereco}
                </li>
              ))
            ) : (
              <p>Sem alertas ativos.</p>
            )}
          </ul>
        </div>

        {/* Card de Alertas Críticos */}
        <div className={styles.alertCard}>
          <FaExclamationTriangle className={styles.alertIcon} />
          <h4>Alertas críticos</h4>
          <ul>
            {recentCases.length > 0 ? (
              recentCases.map((caseItem) => (
                <li key={caseItem._id}>
                  <strong>{caseItem.nome}</strong> - {caseItem.endereco}
                </li>
              ))
            ) : (
              <p>Sem casos recentes registrados.</p>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Alerts;
