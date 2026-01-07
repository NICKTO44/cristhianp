import { useState, useEffect } from 'react';

const usePerformanceMode = () => {
  const [performanceMode, setPerformanceMode] = useState(() => {
    // Intentar cargar preferencia guardada
    const saved = localStorage.getItem('performanceMode');
    if (saved) return saved;
    
    // Si no hay preferencia, detectar automáticamente
    return detectDeviceCapability();
  });

  // Función para detectar capacidad del dispositivo
  function detectDeviceCapability() {
    // Detectar RAM (si está disponible)
    const memory = navigator.deviceMemory; // GB
    
    // Detectar número de núcleos del CPU
    const cores = navigator.hardwareConcurrency || 4;
    
    // Detectar si es móvil
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Detectar ancho de pantalla
    const isSmallScreen = window.innerWidth < 768;

    // LÓGICA DE DETECCIÓN:
    // Modo LITE si:
    // - RAM < 4GB (si está disponible)
    // - Menos de 4 núcleos
    // - Es móvil Y pantalla pequeña
    if (memory && memory < 4) return 'lite';
    if (cores < 4) return 'lite';
    if (isMobile && isSmallScreen) return 'lite';
    
    // Caso contrario: modo COMPLETO
    return 'full';
  }

  // Guardar preferencia cuando cambia
  useEffect(() => {
    localStorage.setItem('performanceMode', performanceMode);
  }, [performanceMode]);

  // Función para cambiar el modo manualmente CON RECARGA AUTOMÁTICA
  const toggleMode = () => {
    const newMode = performanceMode === 'full' ? 'lite' : 'full';
    
    // Guardar el nuevo modo
    localStorage.setItem('performanceMode', newMode);
    
    // Recargar la página automáticamente
    window.location.reload();
  };

  const isLiteMode = performanceMode === 'lite';
  const isFullMode = performanceMode === 'full';

  return {
    performanceMode,
    isLiteMode,
    isFullMode,
    toggleMode,
    setPerformanceMode,
  };
};

export default usePerformanceMode;