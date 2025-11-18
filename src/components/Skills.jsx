import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FaReact,
  FaJs,
  FaCss3Alt,
  FaHtml5,
  FaNodeJs,
  FaDatabase,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiVite,
  SiExpress,
  SiMysql,
} from 'react-icons/si';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: '🎨',
      description: 'Creación de interfaces modernas y responsive',
      skills: [
        { name: 'React', icon: <FaReact />, level: 85, color: '#61DAFB' },
        { name: 'JavaScript', icon: <FaJs />, level: 80, color: '#F7DF1E' },
        { name: 'HTML5', icon: <FaHtml5 />, level: 90, color: '#E34F26' },
        { name: 'CSS3', icon: <FaCss3Alt />, level: 85, color: '#1572B6' },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 90, color: '#06B6D4' },
        { name: 'Vite', icon: <SiVite />, level: 75, color: '#646CFF' },
      ],
    },
    {
      title: 'Backend Development',
      icon: '⚙️',
      description: 'Desarrollo de APIs y lógica del servidor',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs />, level: 80, color: '#339933' },
        { name: 'Express', icon: <SiExpress />, level: 75, color: '#FFFFFF' },
        { name: 'REST APIs', icon: <FaDatabase />, level: 85, color: '#22C55E' },
      ],
    },
    {
      title: 'Database & Tools',
      icon: '🗄️',
      description: 'Gestión de bases de datos y herramientas',
      skills: [
        { name: 'MySQL', icon: <SiMysql />, level: 80, color: '#4479A1' },
        { name: 'Git', icon: '🔀', level: 85, color: '#F05032' },
        { name: 'GitHub', icon: '🐙', level: 85, color: '#FFFFFF' },
      ],
    },
  ];

  const softSkills = [
    { name: 'Resolución de problemas', icon: '🧩' },
    { name: 'Trabajo en equipo', icon: '🤝' },
    { name: 'Comunicación efectiva', icon: '💬' },
    { name: 'Aprendizaje continuo', icon: '📚' },
    { name: 'Adaptabilidad', icon: '🔄' },
    { name: 'Gestión del tiempo', icon: '⏰' },
  ];

  return (
    <section
      id="habilidades"
      ref={ref}
      className="relative py-20 md:py-32 bg-gradient-to-b from-primary-black via-primary-gray/30 to-primary-black overflow-hidden"
    >
      {/* Decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-green/20 rounded-full blur-[120px]"
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
            Habilidades
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Mi stack{' '}
            <span className="text-primary-green">tecnológico</span>
          </h2>

          <p className="text-lg text-primary-white/70 max-w-2xl mx-auto">
            Conocimientos técnicos y habilidades que aplico en cada proyecto
          </p>
        </motion.div>

        {/* Technical Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="glass-strong rounded-2xl p-8 border border-primary-green/20 hover:border-primary-green/50 transition-all duration-300 group cursor-hover"
            >
              {/* Category Header */}
              <div className="text-center mb-8">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl mb-4 inline-block"
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-2xl font-display font-bold text-primary-white group-hover:text-primary-green transition-colors mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-primary-white/60">
                  {category.description}
                </p>
              </div>

              {/* Skills List */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                  >
                    {/* Skill Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-2xl transition-transform group-hover:scale-110"
                          style={{ color: skill.color }}
                        >
                          {skill.icon}
                        </span>
                        <span className="text-sm font-medium text-primary-white">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs text-primary-green font-bold">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-2 bg-primary-gray-light rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3 }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-green to-green-400 rounded-full"
                        style={{
                          boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)',
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glass-strong rounded-2xl p-8 border border-primary-green/20"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-display font-bold text-primary-white mb-2">
              Habilidades{' '}
              <span className="text-primary-green">Blandas</span>
            </h3>
            <p className="text-primary-white/60">
              Competencias que complementan mi desarrollo profesional
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {softSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center text-center p-4 bg-primary-gray-light rounded-xl border border-primary-green/20 hover:border-primary-green/50 transition-all cursor-hover group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl mb-3"
                >
                  {skill.icon}
                </motion.div>
                <span className="text-xs text-primary-white/70 group-hover:text-primary-green transition-colors">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-strong rounded-full border border-primary-green/30">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-primary-green rounded-full"
            />
            <span className="text-sm text-primary-white/80">
              Siempre aprendiendo y mejorando mis habilidades
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-green/50 to-transparent" />
    </section>
  );
};

export default Skills;