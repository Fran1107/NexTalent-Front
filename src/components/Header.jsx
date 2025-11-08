import { NavLink } from 'react-router-dom' 

export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b overflow-x-hidden">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-xl font-bold text-gray-800">
                        Nextalent
                    </div>
                    
                    {/* Navegación */}
                    <div className="flex space-x-6">
                        <NavLink to="/" className="text-gray-600 hover:text-blue-600 transition">Inicio</NavLink>
                        <NavLink to="/quienessomos" className="text-gray-600 hover:text-blue-600 transition">Quienes somos</NavLink>

                    </div>
                    
                    {/* Auth buttons */}
                    <div className="flex space-x-4">
                        <NavLink to="/auth/login" className="px-4 py-2 text-gray-600 hover:text-blue-600 transition">
                            Login
                        </NavLink>
                        <NavLink to="/auth/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            Registrarse
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    )
}
