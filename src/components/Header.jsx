import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser, getCurrentUser } from "../API/AuthAPI";
import { Menu, X } from "lucide-react"; 

export default function Header() {
    const logoUrl = new URL('../../public/NexTalent-logo.png', import.meta.url).href
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [showUserMenu, setShowUserMenu] = useState(false) 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    
    const menuRef = useRef(null) 
    const mobileMenuRef = useRef(null) 

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await getCurrentUser();
                if (response && response.user) {
                    setUser(response.user);
                }
            } catch (error) {
                console.log("No hay sesión activa");
            } finally {
                setIsLoading(false)
            }
        };
        checkUser();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null);
            setShowUserMenu(false);
            setIsMobileMenuOpen(false); 
            navigate('/auth/login');
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    const getInitials = () => {
        if (!user || !user.perfil) return "U";
        if (user.userType === 'pasante') {
            const nombre = user.perfil.nombre || "";
            const apellido = user.perfil.apellido || "";
            return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
        } else {
            const nombre = user.perfil.nombre || "Empresa";
            return nombre.substring(0, 2).toUpperCase();
        }
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="w-full bg-white shadow-sm relative z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

                <div className="flex items-center gap-2">
                    <a href="/" aria-label="Ir al inicio">
                        <img src={logoUrl} alt="NexTalent Logo" className="h-8 w-auto" />
                    </a>
                </div>

                <div className="md:hidden flex items-center">
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-700 focus:outline-none"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <div className="flex space-x-6">
                        <NavLink to="/" className="text-gray-600 hover:text-blue-600 transition">Inicio</NavLink>
                        <NavLink to="/quienessomos" className="text-gray-600 hover:text-blue-600 transition">Quienes somos</NavLink>
                    </div>

                    {isLoading ? (
                        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                    ) : !user ? (
                        <>
                            <span className="text-sm font-semibold text-black hidden lg:block">Cuenta empresa</span>
                            <div className="flex items-center gap-3">
                                <NavLink to="/auth/login" className="bg-purple-900 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-purple-800 transition">
                                    Ingresar
                                </NavLink>
                                <NavLink to="/auth/register" className="border border-purple-900 text-purple-700 text-sm font-medium px-5 py-2 rounded-full hover:bg-purple-50 transition">
                                    Crear cuenta
                                </NavLink>
                            </div>
                        </>
                    ) : (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="h-10 w-10 rounded-full bg-purple-900 text-white flex items-center justify-center font-bold hover:bg-purple-800 transition"
                            >
                                {getInitials()}
                            </button>

                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl py-2 ring-1 ring-black/10 transform origin-top-right animate-scale-fade">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-xs text-gray-500">Hola,</p>
                                        <p className="text-sm font-semibold text-gray-900 truncate">
                                            {user.perfil?.nombre} {user.perfil?.apellido}
                                        </p>
                                    </div>
                                    <NavLink to="/mi-perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition" onClick={() => setShowUserMenu(false)}>
                                        Mi Perfil
                                    </NavLink>
                                    <NavLink to="/mis-postulaciones" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition" onClick={() => setShowUserMenu(false)}>
                                        Mis Postulaciones
                                    </NavLink>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {isMobileMenuOpen && (
                <div 
                    ref={mobileMenuRef}
                    className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 flex flex-col items-center py-6 gap-4 animate-fade-in-down"
                >
                    <NavLink to="/" onClick={closeMobileMenu} className="text-gray-700 text-lg font-medium hover:text-purple-900">Inicio</NavLink>
                    <NavLink to="/quienessomos" onClick={closeMobileMenu} className="text-gray-700 text-lg font-medium hover:text-purple-900">Quienes somos</NavLink>
                    
                    <hr className="w-10 border-gray-300 my-1" />

                    {isLoading ? (
                        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                    ) : !user ? (
                        <div className="flex flex-col gap-3 w-full px-10">
                            <span className="text-center text-sm font-semibold text-gray-500 mb-2">Cuenta empresa</span>
                            <NavLink to="/auth/login" onClick={closeMobileMenu} className="bg-purple-900 text-white text-center py-3 rounded-full hover:bg-purple-800 transition font-bold w-full">
                                Ingresar
                            </NavLink>
                            <NavLink to="/auth/register" onClick={closeMobileMenu} className="border border-purple-900 text-purple-700 text-center py-3 rounded-full hover:bg-purple-50 transition font-bold w-full">
                                Crear cuenta
                            </NavLink>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 w-full">
                            <div className="flex flex-col items-center">
                                <div className="h-14 w-14 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-xl mb-2">
                                    {getInitials()}
                                </div>
                                <p className="text-gray-900 font-semibold">
                                    Hola, {user.perfil?.nombre}
                                </p>
                            </div>
                            
                            <div className="flex flex-col gap-2 w-full px-10 text-center">
                                <NavLink to="/mi-perfil" onClick={closeMobileMenu} className="text-gray-600 py-2 hover:text-purple-900 font-medium">
                                    Mi Perfil
                                </NavLink>
                                <NavLink to="/mis-postulaciones" onClick={closeMobileMenu} className="text-gray-600 py-2 hover:text-purple-900 font-medium">
                                    Mis Postulaciones
                                </NavLink>
                                <button onClick={handleLogout} className="text-red-600 py-2 font-bold hover:text-red-700 mt-2">
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}