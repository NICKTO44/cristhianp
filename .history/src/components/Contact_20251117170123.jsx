import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPaperPlane,
} from 'react-icons/fa';
import emailjs from 'emailjs-com';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const [errors, setErrors] = useState({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'cristhian.quispe@ejemplo.com',
      link: 'mailto:cristhian.quispe@ejemplo.com',
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      value: '+51 999 999 999',
      link: 'https://wa.me/51999999999',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Ubicación',
      value: 'Lima, Perú',
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub />,
      name: 'GitHub',
      url: 'https://github.com/tuusuario',
      color: '#FFFFFF',
    },
    {
      icon: <FaLinkedin />,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/tuusuario',
      color: '#0A66C2',
    },
    {
      icon: <FaWhatsapp />,
      name: 'WhatsApp',
      url: 'https://wa.me/51999999999',
      color: '#25D366',
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus({ loading: true, success: false, error: false });

    try {
      // Configuración de EmailJS
      // Reemplaza estos valores con tus credenciales de EmailJS
      const serviceId = 'YOUR_SERVICE_ID';
      const templateId = 'YOUR_TEMPLATE_ID';
      const userId = 'YOUR_USER_ID';

      await emailjs.sendForm(serviceId, templateId, formRef.current, userId);

      setFormStatus({ loading: false, success: true, error: false });
      setFormData({ name: '', email: '', message: '' });

      // Resetear mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setFormStatus({ loading: false, success: false, error: false });
      }, 5000);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setFormStatus({ loading: false, success: false, error: true });

      // Resetear mensaje de error después de 5 segundos
      setTimeout(() => {
        setFormStatus({ loading: false, success: false, error: false });
      }, 5000);
    }
  };

  return (
    <section
      id="contacto"
      ref={ref}
      className="relative py-20 md:py-32 bg-primary-black overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-background opacity-30" />

      {/* Decorative gradient */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-green/20 rounded-full blur-[120px]"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary-gray-light border border-primary-green/30 rounded-full text-primary-green text-sm font-medium mb-6">
            Contacto
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Trabajemos{' '}
            <span className="text-primary-green">juntos</span>
          </h2>

          <p className="text-lg text-primary-white/70 max-w-2xl mx-auto">
            Estoy disponible para prácticas pre-profesionales, proyectos freelance
            o posiciones junior. ¡Conversemos sobre tu próximo proyecto!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className="glass-strong rounded-xl p-6 border border-primary-green/20 hover:border-primary-green/50 transition-all duration-300 cursor-hover group"
                >
                  {info.link ? (
                    
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4"
                    >
                      <div className="text-3xl text-primary-green group-hover:scale-110 transition-transform">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-primary-white/60 mb-1">
                          {info.title}
                        </p>
                        <p className="text-primary-white font-medium group-hover:text-primary-green transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="text-3xl text-primary-green group-hover:scale-110 transition-transform">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-primary-white/60 mb-1">
                          {info.title}
                        </p>
                        <p className="text-primary-white font-medium">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="glass-strong rounded-xl p-6 border border-primary-green/20">
              <h3 className="text-xl font-display font-bold text-primary-white mb-4">
                Sígueme en redes
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 flex items-center justify-center glass rounded-xl border border-primary-green/30 hover:border-primary-green/50 transition-all cursor-hover group"
                    style={{
                      boxShadow: `0 0 0 rgba(${social.color}, 0)`,
                    }}
                  >
                    <span
                      className="text-2xl text-primary-white group-hover:text-primary-green transition-colors"
                      style={{ color: social.color }}
                    >
                      {social.icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="glass-strong rounded-xl p-6 border border-primary-green/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-primary-green rounded-full"
                />
                <span className="text-primary-green font-bold">
                  Disponible para trabajar
                </span>
              </div>
              <p className="text-sm text-primary-white/70">
                Actualmente buscando oportunidades para prácticas pre-profesionales
                y proyectos freelance
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-strong rounded-2xl p-8 border border-primary-green/20 space-y-6"
            >
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-primary-white mb-2"
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-primary-gray-light border ${
                    errors.name ? 'border-red-500' : 'border-primary-green/30'
                  } rounded-xl text-primary-white placeholder-primary-white/40 focus:outline-none focus:border-primary-green transition-colors`}
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary-white mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-primary-gray-light border ${
                    errors.email ? 'border-red-500' : 'border-primary-green/30'
                  } rounded-xl text-primary-white placeholder-primary-white/40 focus:outline-none focus:border-primary-green transition-colors`}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-primary-white mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 bg-primary-gray-light border ${
                    errors.message ? 'border-red-500' : 'border-primary-green/30'
                  } rounded-xl text-primary-white placeholder-primary-white/40 focus:outline-none focus:border-primary-green transition-colors resize-none`}
                  placeholder="Cuéntame sobre tu proyecto..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={formStatus.loading}
                whileHover={{ scale: formStatus.loading ? 1 : 1.02 }}
                whileTap={{ scale: formStatus.loading ? 1 : 0.98 }}
                className={`w-full btn-primary cursor-hover flex items-center justify-center gap-3 ${
                  formStatus.loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {formStatus.loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-primary-black border-t-transparent rounded-full"
                    />
                    Enviando...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Enviar mensaje
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {formStatus.success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-primary-green/20 border border-primary-green rounded-xl"
                >
                  <p className="text-primary-green text-center font-medium">
                    ¡Mensaje enviado con éxito! Te responderé pronto.
                  </p>
                </motion.div>
              )}

              {formStatus.error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500 rounded-xl"
                >
                  <p className="text-red-500 text-center font-medium">
                    Error al enviar el mensaje. Por favor, intenta nuevamente.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-green/50 to-transparent" />
    </section>
  );
};

export default Contact;