import React, { useState, useEffect } from 'react';
import Header from '../components/home/Header';
import Alerts from '../components/home/Alert';
import Footer from '../components/home/Footer';
import { 
  Brain,
  MapPin, 
  ShieldAlert, 
  Settings2, 
  Cpu, 
  Activity, 
  ChevronRight,
  Database,
  BarChart3,
  Wrench
} from 'lucide-react';
import styles from '../components/home/styles/Home.module.css';
import useMobileMenu from '../components/hooks/useMobileMenu';

function Home() {
  const { isMobileMenuOpen, toggleMenu } = useMobileMenu();
  const [stats, setStats] = useState({ uptime: "99.9%", ativos: 1248 }); // Fallback inicial

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("https://simp-a3.onrender.com/api/alertas");
        const data = await response.json();
        if (Array.isArray(data)) {
          setStats(prev => ({ ...prev, ativos: data.length }));
        }
      } catch (err) {
        console.error("Erro ao sincronizar banco de dados:", err);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <Header toggleMenu={toggleMenu} isMobileMenuOpen={isMobileMenuOpen} />
      
      <main className={styles.main}>
        {/* Dynamic Hero Area */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <div className={styles.heroPulse}></div>
              SYSTEM ACTIVE • SIMP v2.5 PROFESSIONAL
            </div>
            <h1 className={styles.heroTitle}>
              Monitoramento e
              <span>Gestão de Postes</span>
            </h1>
            <p className={styles.heroDescription}>
              <strong>SIMP — Sistema Inteligente de Monitoramento de Postes</strong>
              Gestão georreferenciada e manutenção preditiva para infraestrutura urbana.
            </p>
            <div className={styles.heroActions}>
              <a href="/alertas" className={styles.primaryBtn}>Acessar Dashboard</a>
              <a href="/relatar" className={styles.secondaryBtn}>Relatar Incidência</a>
            </div>
          </div>
        </section>

        {/* The Bento Innovation Grid */}
        <section className={styles.bentoSection}>
          <div className={styles.bentoGrid}>
            
            {/* Feature Bento 1 */}
            <div className={`${styles.bentoItem} ${styles.featureOne}`}>
              <div className={styles.liveBadge}><div className={styles.dot}></div> LIVE DATA</div>
              <MapPin className={styles.bentoIcon} />
              <div className={styles.bentoInfo}>
                <h3>Monitoramento Geo-Espacial</h3>
                <p>Mapeamento via satélite com precisão centimétrica de toda a malha de ativos.</p>
                <div className={styles.techSpecs}>
                   <div className={styles.spec}><span className={styles.specPoint}></span> Sincronização em Tempo Real</div>
                   <div className={styles.spec}><span className={styles.specPoint}></span> Precisão RTK (±2cm)</div>
                   <div className={styles.spec}><span className={styles.specPoint}></span> Visão Multi-Camadas (GIS)</div>
                </div>
              </div>
            </div>

            {/* Feature Bento 2 (Large) */}
            <div className={`${styles.bentoItem} ${styles.featureTwo}`}>
              <div className={styles.aiBadge}><Brain size={12} /> AI ENGINE ACTIVE</div>
              <div className={styles.featureIllustration}>
                <div className={styles.pulseMap}></div>
              </div>
              <div className={styles.bentoInfo}>
                <BarChart3 className={styles.bentoIcon} />
                <h3>Análise Preditiva Profunda</h3>
                <p>Algoritmos de IA detectam inclinações anormais antes mesmo da falha estrutural ocorrer.</p>
                <div className={styles.aiSpecs}>
                   <div className={styles.spec}><span className={styles.aiPoint}></span> Monitoramento Triaxial (±0.1°)</div>
                   <div className={styles.spec}><span className={styles.aiPoint}></span> Análise de Fadiga Estrutural</div>
                   <div className={styles.spec}><span className={styles.aiPoint}></span> Predição de Falha: 72h Janela</div>
                </div>
              </div>
            </div>

            {/* Live Alerts Bento Integration (Scrollable) */}
            <div className={`${styles.bentoItem} ${styles.alertsBento}`}>
              <div className={styles.bentoHeader}>
                <ShieldAlert size={20} /> <h3>Alertas de Campo</h3>
              </div>
              <div className={styles.bentoAlertList}>
                <Alerts mini={true} />
              </div>
            </div>

            {/* Stats Bento */}
            <div className={`${styles.bentoItem} ${styles.statsBento}`}>
                <div className={styles.statBox}>
                   <span className={styles.statLabel}>UPTIME DO SISTEMA</span>
                   <span className={styles.statValue}>{stats.uptime}</span>
                </div>
                <div className={styles.statBox}>
                   <span className={styles.statLabel}>ATIVOS MONITORADOS</span>
                   <span className={styles.statValue}>{stats.ativos.toLocaleString()}</span>
                </div>
            </div>

            {/* Management Bento */}
            <div className={`${styles.bentoItem} ${styles.managementBento}`}>
              <div className={styles.bentoTag}>OTIMIZAÇÃO LOGÍSTICA</div>
              <Wrench className={styles.bentoIcon} />
              <div className={styles.bentoInfo}>
                <h3>Manutenção Eficiente</h3>
                <p>Redução de 45% nos custos operacionais com rotas de manutenção inteligente.</p>
                <div className={styles.maintenanceDetail}>
                  <div className={styles.detailRow}>
                    <span>Meta de Atendimento</span>
                    <div className={styles.progressBar}><div style={{ width: '92%' }}></div></div>
                    <span>92%</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Prevenção de Falhas</span>
                    <strong className={styles.activeStatus}>Ativa</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default Home;
