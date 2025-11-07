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
          <span className="text-gray-800 font-medium">{label}</span>
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

// Ejemplo de uso con múltiples dropdowns
function ExampleUsage() {
  const [sector, setSector] = useState('');
  const [pais, setPais] = useState('');
  const [experiencia, setExperiencia] = useState('');

  const sectores = [
    'Tecnología',
    'Finanzas',
    'Salud',
    'Educación',
    'Marketing',
    'Retail',
    'Construcción',
    'Turismo',
    'Gastronomía',
    'Otro'
  ];

  const paises = [
    'Argentina',
    'Brasil',
    'Chile',
    'Colombia',
    'México',
    'Perú',
    'Uruguay',
    'Venezuela'
  ];

  const niveles = [
    'Sin experiencia',
    'Junior (1-2 años)',
    'Semi-Senior (3-5 años)',
    'Senior (5+ años)'
  ];

  return (
    <div className="w-full max-w-md mx-auto p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Ejemplo de Dropdowns Reutilizables</h2>
      
      <CustomDropdown
        label="Rubro/Sector"
        options={sectores}
        placeholder="Selecciona un sector"
        required={true}
        value={sector}
        onChange={setSector}
      />

      <CustomDropdown
        label="País"
        options={paises}
        placeholder="Selecciona un país"
        required={true}
        value={pais}
        onChange={setPais}
      />

      <CustomDropdown
        label="Nivel de Experiencia"
        options={niveles}
        placeholder="Selecciona tu nivel"
        required={false}
        value={experiencia}
        onChange={setExperiencia}
      />

      {/* Mostrar valores seleccionados */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Valores seleccionados:</h3>
        <p className="text-sm text-gray-600">Sector: {sector || 'No seleccionado'}</p>
        <p className="text-sm text-gray-600">País: {pais || 'No seleccionado'}</p>
        <p className="text-sm text-gray-600">Experiencia: {experiencia || 'No seleccionado'}</p>
      </div>
    </div>
  );
}

// Exporta el ejemplo como default para visualización
// export default ExampleUsage;