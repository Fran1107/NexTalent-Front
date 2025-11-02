import { NavLink } from 'react-router-dom'

export default function Footer() {
    return (
        // {/* Footer */}
        <footer className="mt-12 text-center overflow-x-hidden">
          <nav className="flex flex-wrap justify-center gap-6 mb-6 text-gray-700">
            <a href="/" className="hover:text-purple-700">Inicio</a>
            <span>-</span>
            <a href="#" className="hover:text-purple-700">Quienes somos</a>
            <span>-</span>
            <a href="#" className="hover:text-purple-700">Preguntas frecuentes</a>
            <span>-</span>
            <a href="#" className="hover:text-purple-700">Oportunidades</a>
            <span>-</span>
            <a href="#" className="hover:text-purple-700">Pasantías</a>
            <span>-</span>
            <a href="#" className="hover:text-purple-700">Contacto</a>
          </nav>
          <div className="bg-purple-900 text-white py-4 -mx-4 px-4 rounded-t-3xl">
            <p className="flex items-center justify-center gap-2">
              <span className="text-xl">©</span>
              <span>2025 - Todos los derechos reservados.</span>
            </p>
            </div>
        </footer>
    )
}
