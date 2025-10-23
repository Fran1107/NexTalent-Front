import { NavLink } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Nextalent</h3>
                        <p className="text-gray-400">
                            Conectando talento junior con oportunidades reales.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-4">Enlaces</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><NavLink to="/" className="hover:text-white transition">Inicio</NavLink></li>
                            <li><NavLink to="/about" className="hover:text-white transition">Nosotros</NavLink></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><NavLink to="/" className="hover:text-white transition">Privacidad</NavLink></li>
                            <li><NavLink to="/" className="hover:text-white transition">Términos</NavLink></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-4">Contacto</h4>
                        <p className="text-gray-400">info@nextalent.com</p>
                    </div>
                </div>
                
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 Nextalent. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
