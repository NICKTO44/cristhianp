import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaHeart, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/tuusuario',
      color: '#FFFFFF',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://linkedin.com/in/tuusuario',
      color: '#0A66C2',
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      url: 'https://wa.me/51927391918',
      color: '#25D366',
    },
  ];

  const quickLinks = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Sobre mí', id: 'sobre-mi' },
    { name: 'Proyectos', id: 'proyectos' },
    { name: 'Habilidades', id: 'habilidades' },
    { name: 'Contacto', id: 'contacto' },
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative bg-primary-black border-t border-primary-green/20 overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-20" />

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-green/50 to-transparent" />

      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-green/10 rounded-full blur-[100px]"
      />

      <div className="container-custom relative z-10">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            
            {/* Brand */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-green to-green-400 rounded-lg flex items-center justify-center font-display font-bold text-primary-black text-xl">
                    CQ
                  </div>
                  <span className="text-xl font-display font-bold text-primary-white">
                    Cristhian Quispe
                  </span>
                </div>

                <p className="text-primary-white/70 mb-6 max-w-md">
                  Desarrollador Web especializado en crear aplicaciones modernas y funcionales.
                  Apasionado por el código limpio y las mejores prácticas.
                </p>

                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 flex items-center justify-center glass rounded-lg border border-primary-green/30 hover:border-primary-green/50 transition-all cursor-hover group"
                      aria-label={social.name}
                    >
                      <span className="text-xl text-primary-white group-hover:text-primary-green transition-colors">
                        {social.icon}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-display font-bold text-primary-white mb-4">
                Navegación
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleScroll(link.id);
                      }}
                      whileHover={{ x: 5 }}
                      className="text-primary-white/70 hover:text-primary-green transition-colors cursor-hover inline-block"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-display font-bold text-primary-white mb-4">
                Contacto
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:cristhian.quispe@ejemplo.com"
                    className="text-primary-white/70 hover:text-primary-green transition-colors cursor-hover block"
                  >
                    cristhianquispe@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/51927391918"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-white/70 hover:text-primary-green transition-colors cursor-hover block"
                  >
                    +51 927 391 918
                  </a>
                </li>
                <li>
                  <span className="text-primary-white/70 block">Lima, Perú</span>
                </li>
              </ul>

              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full border border-primary-green/30"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-primary-green rounded-full"
                />
                <span className="text-xs text-primary-green font-medium">
                  Disponible para colaborar
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-primary-green/20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm text-primary-white/60 text-center md:text-left"
            >
              © {currentYear} Cristhian Quispe. Todos los derechos reservados.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 text-sm text-primary-white/60"
            >
              <span>Hecho con</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <FaHeart className="text-primary-green" />
              </motion.div>
              <span>y React</span>
            </motion.div>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center glass rounded-lg border border-primary-green/30 hover:border-primary-green/50 transition-all cursor-hover group"
              aria-label="Volver arriba"
            >
              <FaArrowUp className="text-primary-white group-hover:text-primary-green transition-colors" />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-green/50 to-transparent" />
    </footer>
  );
};

export default Footer;
