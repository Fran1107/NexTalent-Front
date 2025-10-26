import React from 'react'

export default function Testimonials() {
    return (
        <section className="py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">
                    Experiencias Destacadas
                </h2>
                <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
                    Lo que dicen nuestros estudiantes sobre sus primeras experiencias laborales
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-gray-800 rounded-xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    U{i + 1}
                                </div>
                                <div>
                                    <h4 className="font-semibold">Usuario {i + 1}</h4>
                                    <p className="text-gray-400 text-sm">Frontend Developer</p>
                                </div>
                            </div>
                            <p className="text-gray-300">
                                "Mi experiencia fue increíble, conseguí mi primer trabajo gracias a la plataforma..."
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
