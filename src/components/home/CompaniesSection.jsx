import React from 'react'

export default function CompaniesSection() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    Empresas que necesitan tu talento
                </h2>
                {/* Grid de logos */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-center h-20">
                            <span className="text-gray-400">Logo {i + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
