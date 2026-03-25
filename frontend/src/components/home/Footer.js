import React from 'react';
import { 
  ShieldCheck, 
  CodeXml, 
  Users2, 
  Globe, 
  Cpu, 
  Activity,
  Heart
} from 'lucide-react';
import styles from './styles/Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      
      {/* Top Section */}
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <div className={styles.logoGroup}>
            <div className={styles.logoIcon}><Cpu size={24} /></div>
            <h2 className={styles.logo}>SIMP</h2>
          </div>
          <p className={styles.tagline}>Sistema de Monitoramento Georreferenciado para Infraestrutura Elétrica.</p>
          <div className={styles.badgeGroup}>
             <span className={styles.badge}>v2.5 PROFESSIONAL</span>
             <span className={styles.badge}>Nuvem Ativa</span>
          </div>
        </div>

        <div className={styles.linksCol}>
           <h3>PLATAFORMA</h3>
           <ul>
              <li><a href="/">Dashboard</a></li>
              <li><a href="/alertas">Centro de Comando</a></li>
              <li><a href="/relatar">Relatório de Campo</a></li>
           </ul>
        </div>

        <div className={styles.linksCol}>
           <h3>TECNOLOGIA</h3>
           <ul>
              <li>Node.js API (Render)</li>
              <li>Firebase Storage</li>
              <li>Protocolo HTTP/S</li>
              <li>Hospedagem em Nuvem</li>
           </ul>
        </div>

        <div className={styles.statusCol}>
           <h3>Status do Sistema</h3>
           <div className={styles.statusIndicator}>
              <div className={styles.pulse}></div>
              <span>Sistemas Online</span>
           </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottom}>
        <div className={styles.copy}>
          &copy; 2026 SIMP Enterprise. Todos os direitos reservados.
        </div>
        
        <div className={styles.security}>
           <ShieldCheck size={16} /> <span>Conexão Segura (SSL)</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
