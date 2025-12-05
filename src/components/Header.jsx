import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser, getCurrentUser } from "../API/AuthAPI";

export default function Header() {
    const logoUrl = new URL('../../public/NexTalent-logo.png', import.meta.url).href
    const navigate = useNavigate()

    // Estado para guardar el usuario logueado
    const [user, setUser] = useState(null)
    // Estado para mostrar/ocultar el menú desplegable
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null)

    // Estado de carga
    const [isLoading, setIsLoading] = useState(true)

    // NUEVO: Hook para detectar clics fuera del componente
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Si el menú está abierto, existe la referencia, 
            // y el clic NO fue dentro del elemento referenciado (menuRef)
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        // Agregamos el "escucha" al documento
        document.addEventListener("mousedown", handleClickOutside);

        // Limpieza: quitamos el escucha cuando el componente se desmonta
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); // Array vacío para que corra solo al montar

    // 1. Al cargar el componente, verificamos si hay sesión activa
    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await getCurrentUser();
                if (response && response.user) {
                    setUser(response.user);
                }
            } catch (error) {
                console.log("No hay sesión activa o error al obtener usuario");
                // Si falla, user se queda en null, mostrando los botones de login
            } finally { // El finally se ejecuta siempre (haya error o exito)
                setIsLoading(false)
            }
        };
        checkUser();
    }, []);

    // 2. Función para cerrar sesión
    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null); // Limpiamos el estado local
            setShowMenu(false); // Cerramos el menú
            navigate('/auth/login'); // Redirigimos al login
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    // 3. Función para obtener iniciales según el tipo de usuario
    const getInitials = () => {
        if (!user || !user.perfil) return "U"; // U de User por defecto

        if (user.userType === 'pasante') {
            const nombre = user.perfil.nombre || "";
            const apellido = user.perfil.apellido || "";
            return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
        } else {
            // Si es empresa, tomamos las 2 primeras letras del nombre comercial
            const nombre = user.perfil.nombre || "Empresa";
            return nombre.substring(0, 2).toUpperCase();
        }
    };

    return (
        <header className="w-full bg-white shadow-sm relative z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

                {/* LOGO */}
                <div className="flex items-center gap-2">
                    <a href="/" aria-label="Ir al inicio">
                        <img
                            src={logoUrl}
                            alt="NexTalent Logo"
                            className="h-8 w-auto"
                        />
                    </a>
                </div>

                {/* NAVEGACIÓN Y AUTH */}
                <div className="flex items-center gap-6">
                    {/* Links Comunes */}
                    <div className="flex space-x-6">
                        <NavLink to="/" className="text-gray-600 hover:text-blue-600 transition">Inicio</NavLink>
                        <NavLink to="/quienessomos" className="text-gray-600 hover:text-blue-600 transition">Quienes somos</NavLink>
                    </div>

                    {/* 3. MODIFICADO: Lógica de renderizado */}
                    {isLoading ? (
                        // ESTADO DE CARGA:
                        // Mostramos un "esqueleto" o nada para reservar el espacio y evitar saltos
                        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                    ) : !user ? (
                        // NO LOGUEADO (Se muestra solo cuando isLoading es false y user es null)
                        <>
                            <span className="text-sm font-semibold text-black hidden sm:block">
                                Cuenta empresa
                            </span>
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
                        /* OPCIÓN B: LOGUEADO (Círculo con iniciales) */
                        <div className="relative" ref={menuRef}>
                            {/* Círculo Avatar */}
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="h-10 w-10 rounded-full bg-purple-900 text-white flex items-center justify-center font-bold hover:bg-purple-800 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                {getInitials()}
                            </button>

                            {/* Menú Desplegable */}
                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                    <div className="px-4 py-2 border-b">
                                        <p className="text-sm text-gray-500">Hola,</p>
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {user.perfil?.nombre} {user.perfil?.apellido}
                                        </p>
                                    </div>

                                    <NavLink
                                        to="/mi-perfil"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setShowMenu(false)}
                                    >
                                        Mi Perfil
                                    </NavLink>

                                    <NavLink
                                        to="/mis-postulaciones"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setShowMenu(false)}
                                    >
                                        Mis Postulaciones
                                    </NavLink>

                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}