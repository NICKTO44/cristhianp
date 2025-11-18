import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    // Crear el estilo del cursor personalizado
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%2322C55E"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>') 0 0, auto !important;
      }
      
      a, button, input, textarea, select, .cursor-hover {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="%2322C55E"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>') 0 0, pointer !important;
      }

      @media (max-width: 768px) {
        *, a, button, input, textarea, select, .cursor-hover {
          cursor: auto !important;
        }
      }
    `;
    
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default CustomCursor;