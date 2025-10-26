import React from 'react'

export default function JobOffers() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    Ofertas de Trabajo Recientes
                </h2>
                {/* Grid de cards  */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-md border p-6 hover:shadow-lg transition">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                                    <span className="text-gray-500">Co</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Frontend Developer</h3>
                                    <p className="text-gray-600">Empresa {i + 1}</p>
                                </div>
                            </div>
                            <p className="text-gray-500 mb-4">React, JavaScript, CSS</p>
                            <div className="flex justify-between items-center">
                                <span className="text-green-600 font-semibold">$1,200/mes</span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                                    Aplicar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
