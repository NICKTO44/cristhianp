import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projects';
const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('all');

  const filteredProjects =
    filter === 'all'
      ? projectsData
      : filter === 'featured'
      ? projectsData.filter((p) => p.featured)
      : projectsData;

  return (
    <section
      id="proyectos"
      ref={ref}
      className="relative py-20 md:py-32 bg-gradient-to-b from-primary-black via-primary-gray/20 to-primary-black overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-background opacity-30" />

      {/* Decorative gradient */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-green/20 rounded-full blur-[120px]"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary-gray-light border border-primary-green/30 rounded-full text-primary-green text-sm font-medium mb-6">
            Portfolio
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Proyectos{' '}
            <span className="text-primary-green">destacados</span>
          </h2>

          <p className="text-lg text-primary-white/70 max-w-2xl mx-auto mb-10">
            Explora algunos de los proyectos en los que he trabajado,
            aplicando las mejores prácticas y tecnologías modernas
          </p>

          {/* Filter buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all cursor-hover ${
                filter === 'all'
                  ? 'bg-primary-green text-primary-black'
                  : 'bg-primary-gray-light text-primary-white border border-primary-green/30 hover:border-primary-green/50'
              }`}
            >
              Todos
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('featured')}
              className={`px-6 py-2 rounded-full font-medium transition-all cursor-hover ${
                filter === 'featured'
                  ? 'bg-primary-green text-primary-black'
                  : 'bg-primary-gray-light text-primary-white border border-primary-green/30 hover:border-primary-green/50'
              }`}
            >
              Destacados
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-primary-white/70 mb-6">
            ¿Quieres ver más proyectos?
          </p>
          <motion.a
            href="https://github.com/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary cursor-hover inline-flex items-center gap-2"
          >
            Ver más en GitHub
            <FaExternalLinkAlt size={16} />
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-green/50 to-transparent" />
    </section>
  );
};

export default Projects;
