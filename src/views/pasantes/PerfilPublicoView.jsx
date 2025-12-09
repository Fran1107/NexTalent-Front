import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPublicProfile, getMyProfile } from '../../API/pasanteApi.js'; // Asegúrate que el import coincida con tu archivo
import { Edit2, Briefcase, Heart, Settings, Download, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');

export default function PerfilPublicoView() {
    const { id } = useParams();
    const [pasante, setPasante] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const data = await getPublicProfile(id);
                    setPasante(data.pasante);
                    setIsOwner(false);
                } else {
                    const data = await getMyProfile();
                    setPasante(data.pasante);
                    setIsOwner(true);
                }
            } catch (error) {
                console.error("Error cargando perfil", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-64 text-gray-500">Cargando perfil...</div>;
    if (!pasante) return <div className="flex justify-center items-center h-64 text-red-500 font-medium">Perfil no encontrado</div>;

    const fotoUrl = pasante.fotoPerfil ? `${BASE_URL}/${pasante.fotoPerfil}` : "https://via.placeholder.com/150";

    return (
        <div className="container mx-auto mt-8 px-4 mb-20 max-w-5xl">
            
            {/* --- TARJETA DE PERFIL (Banner + Datos) --- */}
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-10">
                
                {/* 1. Banner (Fondo decorativo) */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-48 w-full"></div>
                
                {/* 2. Contenido (Zona Blanca) */}
                <div className="px-8 pb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-end">
                        
                        {/* Foto de Perfil (Con margen negativo para subir) */}
                        <div className="-mt-24 relative">
                            <img 
                                src={fotoUrl} 
                                alt="Perfil" 
                                className="w-48 h-48 rounded-full border-[6px] border-white shadow-lg object-cover bg-white"
                            />
                        </div>
                        
                        {/* Información de Texto (Se queda en lo blanco) */}
                        <div className="mt-4 md:mt-0 md:ml-8 text-center md:text-left flex-1 mb-2">
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                                {pasante.nombre} {pasante.apellido}
                            </h1>
                            <p className="text-indigo-600 font-bold text-lg mt-1">
                                {pasante.carrera}
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 font-medium mt-2">
                                <MapPin size={18} />
                                <span>{pasante.provincia}, {pasante.localidad}</span>
                            </div>
                        </div>
                        
                        {/* Botón de CV */}
                        {pasante.cvUrl && (
                            <div className="mt-6 md:mt-0 md:mb-4">
                                <a 
                                    href={`${BASE_URL}/${pasante.cvUrl}`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                >
                                    <Download size={20} />
                                    Descargar CV
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- ZONA DE CONTROL (Solo para el dueño) --- */}
            {isOwner && (
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 font-noto">Mi Panel de Control</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        
                        <Link to="/mi-perfil/editar" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col items-center group text-center hover:border-blue-100">
                            <Edit2 size={32} className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-gray-800">Editar Perfil</span>
                            <span className="text-sm text-gray-500 mt-1">Datos y Foto</span>
                        </Link>

                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col items-center cursor-pointer group text-center hover:border-blue-100">
                            <Briefcase size={32} className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-gray-800">Mis Postulaciones</span>
                            <span className="text-sm text-gray-500 mt-1">Ver estado</span>
                        </div>

                        <Link to="/mi-perfil/favoritos" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col items-center cursor-pointer group text-center hover:border-red-100">
                            <Heart size={32} className="text-red-500 mb-3 group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-gray-800">Favoritos</span>
                            <span className="text-sm text-gray-500 mt-1">Guardados</span>
                        </Link>

                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col items-center cursor-pointer group text-center hover:border-gray-300">
                            <Settings size={32} className="text-gray-600 mb-3 group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-gray-800">Configuración</span>
                            <span className="text-sm text-gray-500 mt-1">Cuenta</span>
                        </div>
                    </div>
                </div>
            )}

            {/* --- INFORMACIÓN DETALLADA --- */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Columna Izquierda: Sobre mí */}
                <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3 font-noto">Sobre mí</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                        {pasante.sobreMi || "Aún no has agregado una descripción."}
                    </p>
                </div>

                {/* Columna Derecha: Habilidades y Contacto */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 font-noto">Habilidades</h3>
                        <div className="flex flex-wrap gap-2">
                            {pasante.habilidades && pasante.habilidades.length > 0 ? (
                                pasante.habilidades.map((skill, index) => (
                                    <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-full font-semibold">
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">Sin habilidades registradas</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 font-noto">Contacto</h3>
                        <div className="space-y-4">
                            {pasante.linkedinUrl && (
                                <a href={pasante.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 transition group">
                                    <Linkedin size={20} className="group-hover:scale-110 transition-transform"/>
                                    <span className="font-medium truncate">LinkedIn</span>
                                </a>
                            )}
                            <div className="flex items-center gap-3 text-gray-700">
                                <Mail size={20} className="text-gray-400"/>
                                <span>{pasante.email || "Email privado"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Phone size={20} className="text-gray-400"/>
                                <span>{pasante.telefono || "Sin teléfono"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}