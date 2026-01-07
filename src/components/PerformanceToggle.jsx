import { motion } from 'framer-motion';
import usePerformanceMode from '../hooks/usePerformanceMode';

const PerformanceToggle = () => {
  const { isLiteMode, toggleMode } = usePerformanceMode();

  return (
    <motion.button
      onClick={toggleMode}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-2 px-4 py-2 bg-primary-gray-light border border-primary-green/30 rounded-full text-sm font-medium transition-all hover:border-primary-green/50 cursor-hover group"
      aria-label="Cambiar modo de rendimiento"
    >
      {/* Indicador visual */}
      <div className="relative w-10 h-5 bg-primary-gray rounded-full">
        <motion.div
          animate={{
            x: isLiteMode ? 0 : 20,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full ${
            isLiteMode ? 'bg-blue-400' : 'bg-primary-green'
          }`}
        />
      </div>

      {/* Texto */}
      <span className={`${isLiteMode ? 'text-blue-400' : 'text-primary-green'}`}>
        {isLiteMode ? 'Lite' : 'Completo'}
      </span>

      {/* Tooltip opcional */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <div className="bg-primary-gray-light border border-primary-green/30 rounded-lg px-3 py-1 text-xs text-primary-white/80">
          {isLiteMode ? 'Cambiar a modo completo' : 'Cambiar a modo lite'}
        </div>
      </div>
    </motion.button>
  );
};

export default PerformanceToggle;