import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaExclamationTriangle, FaClipboardCheck, FaBars } from 'react-icons/fa';
import styles from './styles/Home.module.css';

const Header = ({ toggleMenu, isMobileMenuOpen }) => {
  const location = useLocation(); // Obtém a localização atual da rota
  const isAlertasPage = location.pathname === '/alertas'; // Verifica se a rota atual é "/alertas"
  const isRelatarPage = location.pathname === '/relatar'; // Verifica se a rota atual é "/relatar"

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        {/* Fazendo a logo ser clicável e redirecionar para a página inicial */}
        <Link to="/" className={styles.logoLink}>
          <img src="/images/logo.png" alt="Logo" className={styles.logo} />
        </Link>
      </div>
      <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ''}`}>
        {/* Só exibe "Ver Alertas" se não estiver na página de alertas */}
        {!isAlertasPage && (
          <Link to="/alertas" className={styles.navLink}>
            <FaExclamationTriangle className={styles.icon} />
            Ver Alertas
          </Link>
        )}
        
        {/* Só exibe "Relatar Problema" se não estiver na página de relatórios */}
        {!isRelatarPage && (
          <Link to="/relatar" className={styles.navLink}>
            <FaClipboardCheck className={styles.icon} />
            Relatar Problema
          </Link>
        )}
      </nav>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <FaBars className={styles.hamburgerIcon} />
      </div>
    </header>
  );
};

export default Header;
