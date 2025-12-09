import React from 'react';
import { XCircle,CircleCheck, X } from 'lucide-react';

// --- MODAL DE ERROR (Fondo Rojo, Letras Blancas) ---
export const ModalMensajeError = ({ isOpen, onClose, title = "Error", message }) => {
  if (!isOpen) return null;

  return (
    // Overlay (Fondo oscuro transparente)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      
      {/* Contenedor del Modal */}
      <div className="relative bg-red-500 w-full max-w-sm m-4 rounded-2xl shadow-2xl transform transition-all scale-115 p-6 text-center text-white">
        
        {/* Botón de cerrar (X pequeña arriba derecha) */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-red-700 rounded-full p-1 transition"
        >
            <X size={20} />
        </button>

        {/* Icono Principal */}
        <div className="flex justify-center mb-4">
          <XCircle size={64} strokeWidth={1.5} className="text-white drop-shadow-md" />
        </div>

        {/* Título (Noto Serif) */}
        <h3 className="text-2xl font-bold font-noto mb-2 tracking-wide">
          {title}
        </h3>

        {/* Mensaje (Roboto) */}
        <p className="text-white/90 font-roboto text-base leading-relaxed mb-6">
          {message}
        </p>

        {/* Botón de Acción Principal */}
        <button 
          onClick={onClose}
          className="bg-white text-red-600 font-bold font-sans py-2 px-6 rounded-full hover:bg-red-50 transition shadow-md w-full"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

// --- MODAL DE ÉXITO (Fondo Verde, Letras Blancas) ---
export const ModalMensajeExito = ({ isOpen, onClose, title = "¡Éxito!", message }) => {
  if (!isOpen) return null;

  return (
    // Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      
      {/* Contenedor del Modal (Verde Esmeralda/Green 600 para que no sea chillón) */}
      <div className="relative bg-green-600 w-full max-w-sm m-4 rounded-2xl shadow-2xl transform transition-all scale-115 p-6 text-center text-white">
        
         {/* Botón de cerrar */}
         <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-green-700 rounded-full p-1 transition"
        >
            <X size={20} />
        </button>

        {/* Icono Principal */}
        <div className="flex justify-center mb-4">
          <CircleCheck size={64} strokeWidth={1.5} className="text-white drop-shadow-md" />
        </div>

        {/* Título (Noto Serif) */}
        <h3 className="text-2xl font-bold font-noto mb-2 tracking-wide">
          {title}
        </h3>

        {/* Mensaje (Roboto) */}
        <p className="text-white/90 font-roboto text-base leading-relaxed mb-6">
          {message}
        </p>

        {/* Botón de Acción Principal */}
        <button 
          onClick={onClose}
          className="bg-white text-green-700 font-bold font-sans py-2 px-6 rounded-full hover:bg-green-50 transition shadow-md w-full"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};