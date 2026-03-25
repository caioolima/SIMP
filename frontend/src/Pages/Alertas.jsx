import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Principal from '../components/principal';
import Modal from '../components/Alertas e Formulário/modal';
import PoleModal from '../components/Alertas e Formulário/PoleModal';
import { ShieldAlert, FileText, Activity, MapPin, Radio, ArrowUpRight } from 'lucide-react';
import styles from './Alertas.module.css';

// Fix for Leaflet default marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Component to animate map movement
function FlyToLocation({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 16, { duration: 2 });
  }, [center, map]);
  return null;
}

function Alertas() {
  const [alertas, setAlertas] = useState([]);
  const [formularios, setFormularios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [poleModalVisible, setPoleModalVisible] = useState(false);
  const [selectedPoleName, setSelectedPoleName] = useState(null);
  const [mapCenter, setMapCenter] = useState([-30.0346, -51.2177]); 
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch('https://simp-a3.onrender.com/api/alertas').then(res => res.json()),
      fetch('https://simp-a3.onrender.com/api/form').then(res => res.json())
    ]).then(([alertsData, formsData]) => {
      setAlertas(alertsData);
      setFormularios(formsData);
      setLoading(false);
    }).catch(err => {
      console.error('Erro ao carregar dados:', err);
      setLoading(false);
    });
  }, []);

  const openModal = (form) => {
    setSelectedForm(form);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const openPoleModal = (pole) => {
    setSelectedPoleName(pole.nome);
    setPoleModalVisible(true);
  };

  const closePoleModal = () => setPoleModalVisible(false);

  const focusPole = (alerta) => {
    // In a real app, we'd have lat/lng. For now, let's simulate or use static coords
    // Porto Alegre approx coords for demo
    const coords = alerta.nome.includes('001') ? [-30.0655, -51.2163] : [-30.0480, -51.1850];
    setMapCenter(coords);
  };

  return (
    <div className={styles.page}>
      <Principal />
      
      {/* Immersive Map Background */}
      <div className={styles.mapWrapper}>
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <FlyToLocation center={mapCenter} />
          
          {alertas.map((alerta, idx) => {
             const coords = alerta.nome.includes('001') ? [-30.0655, -51.2163] : [-30.0480, -51.1850];
             return (
                <Marker key={alerta._id} position={coords}>
                   <Popup>
                      <div className={styles.popupContent}>
                         <strong>Poste {alerta.nome}</strong>
                         <p>{alerta.endereco}</p>
                         <button onClick={() => navigate(`/poste/${encodeURIComponent(alerta.nome)}`)}>Detalhes</button>
                      </div>
                   </Popup>
                </Marker>
             );
          })}
        </MapContainer>
      </div>

      {/* HUD Overlays */}
      <div className={styles.hudOverlay}>
        <div className={styles.hudHeader}>
           <h1 className={styles.alertasTitle}>Centro de Comando</h1>
        </div>

        <div className={styles.hudMain}>
           {/* Sensor Alerts HUD */}
           <div className={`${styles.glassPanel} ${styles.sidebarHUD}`}>
              <div className={styles.hudSectionHeader}>
                 <h3>Telemetria de Sensores [IoT]</h3>
                 <div className={styles.liveBadge}>
                    <div className={styles.liveCircle}></div> LIVE
                 </div>
              </div>

              <div className={styles.scrollArea}>
                 {loading ? (
                    [1, 2, 3].map(i => (
                       <div key={i} className={`${styles.hudItem} ${styles.skeletonHUD}`} style={{ height: '180px' }}></div>
                    ))
                 ) : (
                    <>
                       {alertas.length > 0 ? alertas.map(a => (
                          <div key={a._id} className={styles.hudItem} onClick={() => focusPole(a)}>
                             <div className={styles.itemMeta}>
                                <span className={styles.itemId}>SDR_{a.nome.toUpperCase()}</span>
                                <span className={styles.itemDate}>{new Date(a.data_hora).toLocaleTimeString()}</span>
                             </div>
                             <div className={styles.itemLabel}>Equipamento {a.nome}</div>
                             <div className={styles.itemSub}><MapPin size={12} /> {a.endereco}</div>
                             <div className={styles.itemValue}>{a.grau_inclinacao}° INC</div>
                             <button className={styles.itemAction} onClick={(e) => { e.stopPropagation(); openPoleModal(a); }}>
                                Análise Especializada <ArrowUpRight size={14} />
                             </button>
                          </div>
                       )) : <div className={styles.noDataHUD}>Nenhum alerta de sensor ativo.</div>}
                    </>
                 )}
              </div>
           </div>

           {/* Field Requests HUD */}
           <div className={`${styles.glassPanel} ${styles.sidebarHUD}`}>
              <div className={styles.hudSectionHeader}>
                 <h3>Solicitações e Chamados</h3>
                 <div className={styles.requestCount}>{formularios.length} PENDENTES</div>
              </div>

              <div className={styles.scrollArea}>
                 {loading ? (
                    [1, 2].map(i => (
                       <div key={i} className={`${styles.hudItem} ${styles.skeletonHUD}`} style={{ height: '160px' }}></div>
                    ))
                 ) : (
                    <>
                       {formularios.length > 0 ? formularios.map(f => (
                          <div key={f._id} className={styles.hudItem} style={{ borderLeft: '4px solid #3b82f6' }}>
                             <div className={styles.itemMeta}>
                                <span className={styles.itemId}>LOG_{f._id.slice(-4).toUpperCase()}</span>
                                <span className={styles.itemDate}>{new Date(f.createdAt).toLocaleDateString()}</span>
                             </div>
                             <div className={styles.itemLabel}>Chamado em {f.bairro || 'Região Sul'}</div>
                             <div className={styles.itemSub}><ShieldAlert size={12} /> {f.status || 'Urgente'}</div>
                             <button className={styles.itemAction} style={{ color: '#3b82f6' }} onClick={() => openModal(f)}>
                                Ver Documentação <ArrowUpRight size={14} />
                             </button>
                          </div>
                       )) : <div className={styles.noDataHUD}>Nenhum chamado registrado.</div>}
                    </>
                 )}
              </div>
           </div>

           {/* High Level Stats HUD */}
           <div className={`${styles.glassPanel} ${styles.detailPanel}`}>
              <div className={styles.hudSectionHeader}>
                 <h3>Métricas de Rede</h3>
              </div>
              <div className={styles.scrollArea}>
                 <div className={styles.statHUD}>
                    <div className={styles.statHUDHeader}>
                       <Activity size={16} /> <p>Uptime Global</p>
                    </div>
                    <h2>99.9%</h2>
                    <div className={styles.healthBar}>
                       <div className={styles.healthFill} style={{ width: '99.9%' }}></div>
                    </div>
                 </div>
                 
                 <div className={styles.statHUD}>
                    <div className={styles.statHUDHeader}>
                       <Radio size={16} /> <p>Ativos em Alerta</p>
                    </div>
                    <h2>{alertas.length}</h2>
                    <div className={styles.healthBar}>
                       <div className={styles.healthFill} style={{ width: `${(alertas.length / 100) * 100}%`, background: '#ef4444' }}></div>
                    </div>
                 </div>

                 <div className={styles.statHUD}>
                    <div className={styles.statHUDHeader}>
                       <FileText size={16} /> <p>Chamados/Mês</p>
                    </div>
                    <h2>{formularios.length + 12}</h2>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <Modal show={modalVisible} onClose={closeModal} details={selectedForm} />
      <PoleModal show={poleModalVisible} onClose={closePoleModal} poleName={selectedPoleName} />
    </div>
  );
}

export default Alertas;
