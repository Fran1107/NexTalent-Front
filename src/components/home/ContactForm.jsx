import React from 'react'

export default function ContactForm() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        ¿Listo para empezar?
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Déjanos tus datos y te contactaremos
                    </p>
                </div>

                <form className="bg-gray-50 rounded-xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Nombre</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="tu@email.com"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Mensaje</label>
                        <textarea
                            rows="4"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Cuéntanos sobre ti..."
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Enviar Mensaje
                    </button>
                </form>
            </div>
        </section>
    )
}
