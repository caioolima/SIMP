import { useState, useEffect } from 'react';

const useMobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobileMenuOpen,
    toggleMenu,
  };
};

export default useMobileMenu;
