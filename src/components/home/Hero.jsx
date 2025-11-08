import React from 'react'
export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center text-white py-20 flex items-center"
      style={{
        backgroundImage: "url('/src/assets/Banner-1.png')",
      }}
    >
      {/* Capa oscura (overlay) */}
      <div className="absolute inset-0 bg-black/"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        
        <p className="text-xl mb-8 opacity-90">
           Encontrá tu lugar
        </p>

        
        <div className="relative max-w-xl mx-auto mt-6">
          <input
            type="text"
            placeholder="Sector, empresa o palabra clave"
            className="w-full px-4 py-3 pr-10 bg-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600"
          />
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
