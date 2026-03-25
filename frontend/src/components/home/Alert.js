import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';
import styles from './styles/Home.module.css';

const Alerts = ({ mini }) => {
  const [recentCases, setRecentCases] = useState([]);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlerts = async () => {
    try {
      const [recentCasesResponse, activeAlertsResponse] = await Promise.all([
        fetch('https://simp-a3.onrender.com/api/alertas/criticos'),
        fetch('https://simp-a3.onrender.com/api/alertas/em-alerta'),
      ]);
      if (!recentCasesResponse.ok || !activeAlertsResponse.ok) throw new Error('Erro ao buscar dados');
      setRecentCases(await recentCasesResponse.json());
      setActiveAlerts(await activeAlertsResponse.json());
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const AlertSkeleton = () => (
    <div className={`${styles.alertCard} skeleton`}>
      <div style={{ height: '30px', width: '30px', backgroundColor: '#e2e8f0', borderRadius: '50%', marginBottom: '1rem' }}></div>
      <div style={{ height: '20px', width: '60%', backgroundColor: '#e2e8f0', borderRadius: '4px', marginBottom: '1.5rem' }}></div>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ height: '12px', width: '90%', backgroundColor: '#f1f5f9', borderRadius: '4px', marginBottom: '1rem' }}></div>
      ))}
    </div>
  );
  
  if (mini) {
     return (
       <div className={styles.miniAlerts}>
         {loading ? <AlertSkeleton /> : (
           <div className={styles.bentoContent}>
             <ul className={styles.compactList}>
               {[...activeAlerts, ...recentCases].slice(0, 4).map((a, idx) => (
                 <li key={a._id || idx} className={styles.compactItem}>
                   <div className={styles.compactMain}>
                     <div className={styles.compactLeft}>
                       <span className={styles.statusDot} data-status={idx % 2 === 0 ? "alerta" : "critico"}></span>
                       <strong>Poste {a.nome}</strong>
                     </div>
                     <span className={styles.compactTime}>Agora</span>
                   </div>
                   <p className={styles.compactAddr}>{a.endereco}</p>
                 </li>
               ))}
             </ul>
             <Link to="/alertas" className={styles.viewMoreBento}>
               Acessar Central <ArrowRight size={18} />
             </Link>
           </div>
         )}
       </div>
     );
  }

  return (
    <section className={styles.alerts}>
      <div className={styles.alertHeader}>
        <h3 className={styles.alertsTitle}>Centro de Monitoramento</h3>
        <div className={styles.liveIndicator}>
          <div className={styles.pulse}></div> Monitoramento em tempo real
        </div>
      </div>
      
      {loading ? (
        <div className={styles.alertCards}>
          <AlertSkeleton />
          <AlertSkeleton />
        </div>
      ) : (
        <div className={styles.alertCards}>
          {/* Card de Casos de Risco */}
          <div className={styles.alertCard} data-type="warning">
            <FaShieldAlt className={styles.alertIcon} />
            <h4>Casos em Alerta</h4>
            <ul>
              {activeAlerts.length > 0 ? (
                activeAlerts.map((alertItem) => (
                  <li key={alertItem._id}>
                    <strong>Equipamento {alertItem.nome}</strong> <span>{alertItem.endereco}</span>
                  </li>
                ))
              ) : (
                <p className={styles.emptyMsg}>Nenhum equipamento em alerta.</p>
              )}
            </ul>
          </div>

          {/* Card de Alertas Críticos */}
          <div className={styles.alertCard} data-type="critical">
            <FaExclamationTriangle className={styles.alertIcon} />
            <h4>Alertas Críticos</h4>
            <ul>
              {recentCases.length > 0 ? (
                recentCases.map((caseItem) => (
                  <li key={caseItem._id}>
                    <strong>Equipamento {caseItem.nome}</strong> <span>{caseItem.endereco}</span>
                  </li>
                ))
              ) : (
                <p className={styles.emptyMsg}>Nenhum alerta crítico registrado.</p>
              )}
            </ul>
          </div>
        </div>
      )}
      
      {error && <div className={styles.errorBanner}>Erro ao carregar dados: {error}</div>}
    </section>
  );
};

export default Alerts;
