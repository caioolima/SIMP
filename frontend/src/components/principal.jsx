import React from 'react';
import Header from '../components/home/Header';
import useMobileMenu from '../components/hooks/useMobileMenu'; // Use o caminho correto aqui.

function Principal() {
  const { isMobileMenuOpen, toggleMenu } = useMobileMenu();

  return (
    <div>
      <Header toggleMenu={toggleMenu} isMobileMenuOpen={isMobileMenuOpen} />
    </div>
  );
}

export default Principal;
