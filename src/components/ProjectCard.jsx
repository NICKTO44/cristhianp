import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative h-full cursor-hover"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-green to-green-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500" />

      {/* Card */}
      <div className="relative h-full glass-strong rounded-2xl overflow-hidden border border-primary-green/20 group-hover:border-primary-green/50 transition-all duration-300">

        {/* Image container */}
        <div className="relative h-56 overflow-hidden bg-primary-gray">
          <img
            src={`${import.meta.env.BASE_URL}${project.image}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />

          {/* Fallback */}
          <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-primary-gray to-primary-gray-light">
            <div className="text-6xl text-primary-green opacity-50">💻</div>
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/50 to-transparent opacity-60" />

          {/* Featured badge */}
          {project.featured && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute top-4 right-4 px-3 py-1 bg-primary-green text-primary-black text-xs font-bold rounded-full"
            >
              Destacado
            </motion.div>
          )}

          {/* Quick action buttons on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center gap-4 bg-primary-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-primary-green text-primary-black rounded-lg font-semibold hover:bg-green-400 transition-colors"
            >
              <FaExternalLinkAlt size={16} />
              Ver Demo
            </motion.a>

            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-primary-white text-primary-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              <FaGithub size={16} />
              Código
            </motion.a>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-2xl font-display font-bold text-primary-white mb-3 group-hover:text-primary-green transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-primary-white/70 mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-primary-gray-light border border-primary-green/30 rounded-full text-xs text-primary-green font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-primary-gray-light">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary-white/70 hover:text-primary-green transition-colors cursor-hover"
            >
              <FaExternalLinkAlt size={14} />
              Ver demo
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary-white/70 hover:text-primary-green transition-colors cursor-hover"
            >
              <FaGithub size={14} />
              GitHub
            </a>
          </div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'linear-gradient(45deg, transparent 30%, rgba(34, 197, 94, 0.1) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
