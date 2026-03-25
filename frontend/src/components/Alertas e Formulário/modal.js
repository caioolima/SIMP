import React from 'react';
import styles from './modal.module.css';
import { 
  X, 
  MapPin, 
  ShieldAlert, 
  Clock, 
  Hash, 
  Home, 
  Navigation, 
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';

function Modal({ show, onClose, details }) {
  if (!show || !details) return null;

  const address = `${details.rua}, ${details.bairro}, ${details.cidade}, ${details.estado}`;
  const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>

        <header className={styles.header}>
           <div className={styles.badge}>DOCUMENTAÇÃO TÉCNICA</div>
           <h2 className={styles.modalTitle}>Relatório de Ocorrência #{details._id.slice(-6).toUpperCase()}</h2>
        </header>

        <div className={styles.grid}>
          {/* Coluna de Informações */}
          <div className={styles.infoCol}>
             <div className={styles.statGroup}>
                <div className={styles.field}>
                   <div className={styles.label}><MapPin size={14} /> LOCALIZAÇÃO</div>
                   <div className={styles.value}>{details.rua || 'N/A'}, {details.bairro}</div>
                </div>
                
                <div className={styles.field}>
                   <div className={styles.label}><Hash size={14} /> CEP</div>
                   <div className={styles.value}>{details.cep}</div>
                </div>
             </div>

             <div className={styles.statGroup}>
                <div className={styles.field}>
                   <div className={styles.label}><Clock size={14} /> REGISTRO</div>
                   <div className={styles.value}>{new Date(details.createdAt).toLocaleString()}</div>
                </div>

                <div className={styles.field}>
                   <div className={styles.label}><ShieldAlert size={14} /> STATUS ATUAL</div>
                   <div className={`${styles.statusBadge} ${details.status === 'resolvido' ? styles.resolvido : styles.pendente}`}>
                      {details.status?.toUpperCase() || 'URGENTE'}
                   </div>
                </div>
             </div>

             <div className={styles.field}>
                <div className={styles.label}><ImageIcon size={14} /> REGISTRO FOTOGRÁFICO</div>
                {details.imagemUrl ? (
                  <img src={details.imagemUrl} alt="Evidência" className={styles.formImage} />
                ) : (
                  <div className={styles.noImage}>Nenhuma imagem anexada ao chamado.</div>
                )}
             </div>
          </div>

          {/* Coluna do Mapa */}
          <div className={styles.mapCol}>
             <div className={styles.label}><Navigation size={14} /> GEOLOCALIZAÇÃO</div>
             <div className={styles.mapWrapper}>
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={googleMapsLink}
                  allowFullScreen
                  title="Google Maps"
                ></iframe>
             </div>
             <button className={styles.resolveBtn}>
                <CheckCircle2 size={18} /> ASSINALAR COMO RESOLVIDO
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
