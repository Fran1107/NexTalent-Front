import React from 'react';

// Datos de ejemplo para las empresas
const companies = [
    { name: 'YPF', logoClass: 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold text-xl', text: 'YPF', logoUrl: 'YPF.jpg' },
    { name: 'Accenture', logoClass: 'border border-gray-200 p-2', logoUrl: 'Accenture.png' },
    { name: 'Globant', logoClass: 'border border-gray-200 p-2', logoUrl: 'Globant.png' },
    { name: 'Mercado Libre', logoClass: 'border border-gray-200 p-2', logoUrl: 'Mercado Libre.png' },
    { name: 'Pampa Energia', logoClass: 'border border-gray-200 p-2', logoUrl: 'Pampa Energia.png' },
    // Puedes añadir más si quieres
];

/**
 * Componente para mostrar el logo de una empresa.
 * @param {object} props
 * @param {string} props.logoUrl - La URL de la imagen del logo.
 * @param {string} props.alt - Texto alternativo para la imagen.
 * @param {string} props.customStyles - Clases adicionales de Tailwind para el estilo del contenedor.
 */
const CompanyLogo = ({ logoUrl, alt, customStyles }) => {
    return (
        // Se mantiene el tamaño fijo del contenedor y se añade un padding (p-2)
        // para asegurar que las imágenes no toquen los bordes.
        <div className={`flex-shrink-0 w-28 h-20 sm:w-32 sm:h-24 md:w-36 md:h-28 flex items-center justify-center rounded-lg shadow-md transition-shadow hover:shadow-lg cursor-pointer ${customStyles}`}>
            
            {/* Ajuste Clave:
            Se envuelve la imagen en un div con padding (p-4) para centrarla mejor y 
            se usa 'object-scale-down' para garantizar que se ajusta sin recortarse.
            */}
            <div className="p-4 w-full h-full flex items-center justify-center">
                {/* Lógica para YPF: Si es YPF, renderiza el texto. 
                De lo contrario, renderiza la imagen.
                */}
                {alt === 'YPF' ? (
                    <span className="text-white text-xl font-bold">YPF</span>
                ) : (
                    <img 
                        src={`/${logoUrl}`} // Se asegura la ruta absoluta desde la raíz
                        alt={alt} 
                        // object-scale-down es similar a 'contain', pero fuerza un mejor ajuste visual
                        className="max-h-full max-w-full object-scale-down" 
                    />
                )}
            </div>
        </div>
    );
};

export default function CompaniesSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-12">
                    Empresas que necesitan tu talento
                </h2>
                
                {/* Contenedor del Carrusel (simulado) */}
                <div className="flex items-center justify-center">
                    
                    {/* Flecha Izquierda */}
                    <button className="text-gray-500 hover:text-gray-800 text-3xl p-2 rounded-full transition-colors hidden sm:block" 
                            aria-label="Anterior">
                        &lt;
                    </button>

                    {/* Contenedor de Logos */}
                    <div className="flex space-x-4 sm:space-x-6 md:space-x-8 overflow-x-auto py-2">
                        {companies.map((company, index) => (
                            <CompanyLogo 
                                key={index} 
                                // Se pasa solo el nombre del archivo. El CompanyLogo se encarga de la ruta y el estilo.
                                logoUrl={company.logoUrl} 
                                alt={company.name}
                                // Se aplica el estilo de YPF aquí para que el CompanyLogo sepa cómo debe lucir el contenedor.
                                customStyles={company.name === 'YPF' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-white border border-gray-200'}
                            />
                        ))}
                    </div>

                    {/* Flecha Derecha */}
                    <button className="text-gray-500 hover:text-gray-800 text-3xl p-2 rounded-full transition-colors hidden sm:block" 
                            aria-label="Siguiente">
                        &gt;
                    </button>
                </div>
                {/* Hint para el scroll en móviles */}
                <p className="text-center text-sm text-gray-500 mt-4 sm:hidden">
                    &larr; Desliza para ver más &rarr;
                </p>
            </div>
        </section>
    );
}