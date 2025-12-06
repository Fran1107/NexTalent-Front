import React from 'react';

// Datos de ejemplo para las tarjetas, mejorando la estructura del código
const testimonialsData = [
    { id: 1, user: 'Usuario 1', initial: 'U1', role: 'Frontend Developer', quote: 'Mi experiencia fue increíble, conseguí mi primer trabajo gracias a la plataforma...' },
    { id: 2, user: 'Usuario 2', initial: 'U2', role: 'Frontend Developer', quote: 'Mi experiencia fue increíble, conseguí mi primer trabajo gracias a la plataforma...' },
    { id: 3, user: 'Usuario 3', initial: 'U3', role: 'Frontend Developer', quote: 'Mi experiencia fue increíble, conseguí mi primer trabajo gracias a la plataforma...' },
];

export default function Testimonials() {
    return (
        // Fondo más oscuro (bg-gray-900 es un buen punto de partida)
        <section className="py-20 bg-[#101423] text-white"> 
            <div className="container mx-auto px-4">
                
                {/* Título: Texto blanco, más grande y con más espaciado */}
                <h2 className="text-4xl font-extrabold text-center mb-4">
                    Experiencias Destacadas
                </h2>
                
                {/* Subtítulo: Texto de color gris más suave y menor tamaño */}
                <p className="text-center text-gray-400 text-base mb-16 max-w-2xl mx-auto">
                    Lo que dicen nuestros estudiantes sobre sus primeras experiencias laborales
                </p>

                {/* Grid de Testimonios */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {testimonialsData.map((item) => (
                        // Tarjeta: Fondo más oscuro que el fondo principal y esquinas ligeramente más redondeadas
                        <div 
                            key={item.id} 
                            className="bg-[#1A2033] rounded-xl p-8 shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
                        >
                            <div className="flex items-center mb-6">
                                {/* Iniciales: Círculo grande, púrpura (similar al tono de la imagen) */}
                                <div className="w-12 h-12 bg-[#8B5CF6] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shrink-0">
                                    {item.initial}
                                </div>
                                <div>
                                    {/* Nombre: Fuente normal, color blanco */}
                                    <h4 className="font-normal text-lg">{item.user}</h4>
                                    {/* Rol: Texto gris más claro y más pequeño */}
                                    <p className="text-gray-400 text-sm">{item.role}</p>
                                </div>
                            </div>
                            
                            {/* Cita: Texto principal con un poco más de opacidad */}
                            <p className="text-gray-300 text-lg leading-relaxed">
                                "{item.quote}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}