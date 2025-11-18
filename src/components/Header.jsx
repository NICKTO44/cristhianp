import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  // Detectar scroll para efecto glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detectar sección activa
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'sobre-mi', 'proyectos', 'habilidades', 'contacto'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Sobre mí', id: 'sobre-mi' },
    { name: 'Proyectos', id: 'proyectos' },
    { name: 'Habilidades', id: 'habilidades' },
    { name: 'Contacto', id: 'contacto' },
  ];

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-hover"
          >
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('inicio');
              }}
              className="text-2xl font-display font-bold tracking-tight"
            >
              <span className="text-primary-green">C</span>
              <span className="text-primary-white">Q</span>
            </a>
          </motion.div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative text-sm font-medium transition-colors cursor-hover ${
                  activeSection === item.id
                    ? 'text-primary-green'
                    : 'text-primary-white hover:text-primary-green'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-green"
                    style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.6)' }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Social Icons Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href="https://github.com/NICKTO44"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-primary-white hover:text-primary-green transition-colors cursor-hover"
              aria-label="GitHub"
            >
              <FaGithub size={22} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/tuusuario"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-primary-white hover:text-primary-green transition-colors cursor-hover"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={22} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary-white hover:text-primary-green transition-colors cursor-hover"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden glass-strong rounded-b-2xl"
            >
              <div className="flex flex-col space-y-4 py-6 px-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`text-base font-medium transition-colors cursor-hover ${
                      activeSection === item.id
                        ? 'text-primary-green'
                        : 'text-primary-white hover:text-primary-green'
                    }`}
                  >
                    {item.name}
                  </motion.a>
                ))}

                {/* Social Icons Mobile */}
                <div className="flex items-center space-x-6 pt-4 border-t border-primary-gray-light">
                  <motion.a
                    href="https://github.com/NICKTO44"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.9 }}
                    className="text-primary-white hover:text-primary-green transition-colors cursor-hover"
                    aria-label="GitHub"
                  >
                    <FaGithub size={24} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/tuusuario"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.9 }}
                    className="text-primary-white hover:text-primary-green transition-colors cursor-hover"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={24} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
