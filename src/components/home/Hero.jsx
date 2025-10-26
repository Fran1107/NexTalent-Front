import React from 'react'

export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                {/* Contenido hero  */}
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Encuentra tu primer trabajo tech
                </h1>
                <p className="text-xl mb-8 opacity-90">
                    Conectamos talento junior con empresas innovadoras
                </p>
                <div className="flex justify-center space-x-4">
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Ver ofertas
                    </button>
                    <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                        Soy empresa
                    </button>
                </div>
            </div>
        </section>
    )
}
