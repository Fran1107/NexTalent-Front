import { useState } from 'react';

export default function CustomDropdown({ 
  label, 
  options = [], 
  placeholder = 'Selecciona una opción',
  required = false,
  onChange,
  value 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className="relative">
      {/* Label */}
      {label && (
        <label className="block mb-2">
          {required && <span className="text-red-500 mr-1">*</span>}
          <span className="text-gray-700 font-medium text-sm">{label}</span>
        </label>
      )}

      {/* Botón dropdown */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#F3F1F1] hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg flex items-center justify-between transition"
      >
        <span className={selectedValue ? 'text-gray-800' : 'text-gray-400'}>
          {selectedValue || placeholder}
        </span>
        <svg 
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && options.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option)}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 transition text-gray-700 border-b border-gray-100 last:border-b-0"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Cerrar dropdown al hacer click fuera */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
