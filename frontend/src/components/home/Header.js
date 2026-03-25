import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, ShieldAlert, ClipboardCheck, Menu } from 'lucide-react';
import styles from './styles/Home.module.css';

const Header = ({ toggleMenu, isMobileMenuOpen }) => {
  const location = useLocation(); 
  const isAlertasPage = location.pathname === '/alertas'; 
  const isRelatarPage = location.pathname === '/relatar'; 

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logoGroup}>
            <div className={styles.logoIcon}>
              <Cpu size={22} />
            </div>
            <span className={styles.logoText}>SIMP</span>
          </div>
        </Link>
      </div>
      <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ''}`}>
        {!isAlertasPage && (
          <Link to="/alertas" className={styles.navLink}>
            <ShieldAlert className={styles.icon} size={18} />
            Ver Alertas
          </Link>
        )}
        
        {!isRelatarPage && (
          <Link to="/relatar" className={styles.navLink}>
            <ClipboardCheck className={styles.icon} size={18} />
            Relatar Problema
          </Link>
        )}
      </nav>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <Menu className={styles.hamburgerIcon} />
      </div>
    </header>
  );
};

export default Header;
