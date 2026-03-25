import React, { useEffect, useState } from 'react';
import styles from './PoleModal.module.css';
import { 
  X, 
  Activity, 
  MapPin, 
  Cpu, 
  Wifi, 
  AlertTriangle, 
  Zap,
  TrendingDown,
  Clock
} from 'lucide-react';

function PoleModal({ show, onClose, poleName }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (show && poleName) {
      setLoading(true);
      fetch(`https://simp-a3.onrender.com/api/alertas/nome/${poleName}`)
        .then(res => res.json())
        .then(data => {
          setDetails(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [show, poleName]);

  if (!show) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>

        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Sincronizando Telemetria SDR...</p>
          </div>
        ) : (
          details && (
            <>
              <header className={styles.header}>
                <div className={styles.meta}>
                   <span className={styles.tag}>EQUIPAMENTO_CRÍTICO</span>
                   <span className={styles.tag}>SDR_{details.nome.toUpperCase()}</span>
                </div>
                <h2 className={styles.title}>Análise Técnica: Poste {details.nome}</h2>
              </header>

              <div className={styles.mainGrid}>
                {/* Coluna 1: Status e Sensores */}
                <div className={styles.dataCol}>
                   <div className={styles.card}>
                      <div className={styles.cardHeader}>
                         <Activity size={16} /> <span>STATUS SENSORIAL</span>
                      </div>
                      <div className={styles.tiltValue}>
                         {details.grau_inclinacao}°
                         <span className={styles.tiltLabel}>INCLINAÇÃO ATUAL</span>
                      </div>
                      <div className={styles.healthMsg}>
                         <TrendingDown size={14} /> Estabilidade da estrutura comprometida
                      </div>
                   </div>

                   <div className={styles.technicalSpecs}>
                      <div className={styles.specItem}>
                         <Cpu size={14} /> <strong>PROCESSADOR</strong>
                         <span>Arduino ATmega2560</span>
                      </div>
                      <div className={styles.specItem}>
                         <Wifi size={14} /> <strong>PROTOCOLO</strong>
                         <span>MQTT / WebSocket</span>
                      </div>
                      <div className={styles.specItem}>
                         <Clock size={14} /> <strong>ÚLTIMO PING</strong>
                         <span>{new Date(details.data_hora).toLocaleTimeString()}</span>
                      </div>
                   </div>
                </div>

                {/* Coluna 2: Localização e Mapa */}
                <div className={styles.visualCol}>
                   <div className={styles.locationCard}>
                      <div className={styles.locationLabel}><MapPin size={14} /> PONTO DE INSTALAÇÃO</div>
                      <div className={styles.locationValue}>{details.endereco}</div>
                   </div>

                   <div className={styles.mapWrapper}>
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(details.endereco)}&output=embed`}
                        allowFullScreen
                        title="Google Maps"
                      ></iframe>
                   </div>

                   <div className={styles.actionFooter}>
                      <button className={styles.primaryBtn}>
                         <AlertTriangle size={16} /> EMITIR ALERTA DE MANUTENÇÃO
                      </button>
                      <button className={styles.secondaryBtn}>
                         <Zap size={16} /> TESTE DE PING
                      </button>
                   </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default PoleModal;
