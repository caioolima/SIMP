import React from 'react';
import Header from '../components/home/Header';
import Section from '../components/home/Section';
import Features from '../components/home/Features';
import Alerts from '../components/home/Alert';
import Footer from '../components/home/Footer';
import styles from '../components/home/styles/Home.module.css';
import useMobileMenu from '../components/hooks/useMobileMenu';

function Home() {
  const { isMobileMenuOpen, toggleMenu } = useMobileMenu();

  return (
    <div className={styles.container}>
      <Header toggleMenu={toggleMenu} isMobileMenuOpen={isMobileMenuOpen} />
      
      <Section
        title="Tecnologia de Ponta para a Segurança Pública"
        description="O sistema de monitoramento de postes utiliza sensores avançados para monitorar a integridade dos postes..."
        imageSrc="https://images.pexels.com/photos/16880204/pexels-photo-16880204/free-photo-of-homem-trabalhando-de-pe-escada.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        imageAlt="Sistema de Monitoramento"
      />
      
      <Features />
      <Alerts />
      <Footer />
    </div>
  );
}

export default Home;
