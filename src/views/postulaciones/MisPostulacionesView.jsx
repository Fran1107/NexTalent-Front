import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMisAplicaciones } from '../../API/aplicacionAPI.js';
import { getAllPostulaciones } from '../../API/postulacionAPI.js'; 
import { Building, MapPin, Calendar, ChevronRight, Briefcase } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');

export default function MisPostulacionesView() {
    const [listaCombinada, setListaCombinada] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarYCruzarDatos = async () => {
            try {
                const [resOfertas, resAplicaciones] = await Promise.all([
                    getAllPostulaciones(),
                    getMisAplicaciones()
                ]);

                const todasLasOfertas = Array.isArray(resOfertas) ? resOfertas : (resOfertas.postulaciones || []);
                const misAplicaciones = Array.isArray(resAplicaciones) ? resAplicaciones : (resAplicaciones.aplicaciones || []);

                const dataFinal = misAplicaciones.map((app) => {
                    const idBuscado = typeof app.postulacionId === 'object' 
                        ? app.postulacionId._id 
                        : app.postulacionId;

                    const ofertaOriginal = todasLasOfertas.find(oferta => oferta._id === idBuscado);

                    return {
                        ...app, 
                        ofertaData: ofertaOriginal || {} 
                    };
                });

                setListaCombinada(dataFinal);

            } catch (error) {
                console.error("Error cruzando datos:", error);
            } finally {
                setLoading(false);
            }
        };

        cargarYCruzarDatos();
    }, []);

    // Helper simple para la URL
    const getLogoUrl = (path) => {
        if (!path) return "https://via.placeholder.com/80";
        if (path.startsWith('http')) return path; 
        return `${BASE_URL}/${path}`;
    };

    const getStatusColor = (estado) => {
        switch (estado) {
            case 'Aceptada': return 'bg-green-100 text-green-700 border-green-200';
            case 'Rechazada': return 'bg-red-100 text-red-700 border-red-200';
            case 'En revision': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }
    };

    if (loading) return <div className="text-center py-20 text-gray-500">Cargando historial...</div>;

    return (
        <div className="min-h-screen bg-[#F6F4FA] pt-10 px-4 pb-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-8">
                    Historial de Postulaciones
                </h1>

                {listaCombinada.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-xl shadow-sm">
                        <p className="text-gray-500 mb-4">Aún no te has postulado a ninguna oferta.</p>
                        <Link to="/" className="text-indigo-600 font-medium hover:underline">
                            Explorar Pasantías
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {listaCombinada.map((item) => {
                            const oferta = item.ofertaData; 
                            const empresa = oferta.empresaId || {}; 
                            
                            const rutaLogo = empresa.logo || oferta.logo;
                            const logoUrl = getLogoUrl(rutaLogo);
                            const fecha = new Date(item.createdAt).toLocaleDateString();

                            return (
                                <div 
                                    key={item._id} 
                                    className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col md:flex-row gap-5 items-start"
                                >
                                    
                                    {/* LOGO (Tamaño w-20 h-20 igual que en Ofertas) */}
                                    <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-white border rounded-lg shadow-sm overflow-hidden">
                                        <img 
                                            src={logoUrl} 
                                            alt="Logo" 
                                            className="w-full h-full object-contain"
                                            onError={(e) => e.target.src = "https://via.placeholder.com/80"}
                                        />
                                    </div>

                                    {/* Info Principal */}
                                    <div className="flex-1 w-full">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                                                    <Calendar size={12}/> Aplicado el {fecha}
                                                </p>
                                                <h2 className="text-xl font-semibold text-gray-900">
                                                    {oferta.titulo || "Oferta no disponible"}
                                                </h2>
                                                <p className="text-indigo-600 font-medium text-sm mt-1 flex items-center gap-1">
                                                    <Building size={14}/> {oferta.empresa || empresa.nombreCorporativo || "Empresa"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Descripción cortada (opcional, para dar consistencia visual con Ofertas) */}
                                        <p className="text-gray-600 mt-3 text-sm line-clamp-2 font-sans">
                                            {oferta.descripcion || "Sin descripción disponible."}
                                        </p>
                                        
                                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-4 font-medium">
                                            {oferta.lugar && (
                                                <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                                    <MapPin size={14}/> 
                                                    {oferta.lugar.localidad || oferta.lugar.provincia || "Ubicación"}
                                                </span>
                                            )}
                                            {oferta.modalidad && (
                                                <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                                    <Briefcase size={14}/> {oferta.modalidad}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* COLUMNA DERECHA (Copiada estructura de Ofertas) */}
                                    <div className="flex flex-row md:flex-col items-center justify-between w-full md:w-auto mt-4 md:mt-0 gap-3 min-w-[140px]">
                                        
                                        {/* 1. Elemento Superior: ESTADO (En lugar del Corazón) */}
                                        <span className={`px-4 py-1 rounded-full text-xs font-bold border w-full md:w-auto text-center ${getStatusColor(item.estado)}`}>
                                            {item.estado || 'Enviada'}
                                        </span>

                                        {/* 2. Elemento Inferior: BOTÓN VER OFERTA (Con margen superior grande) */}
                                        {oferta._id && (
                                            <Link 
                                                to={`/postulaciones/${oferta._id}`} 
                                                // Aquí aplicamos el md:mt-20 para empujarlo abajo igual que el botón Postularme
                                                className="md:mt-20 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-6 py-2 rounded-full font-medium transition text-sm flex items-center justify-center gap-1 whitespace-nowrap w-full md:w-auto group"
                                            >
                                                Ver Oferta <ChevronRight size={16} className="group-hover:translate-x-1 transition"/>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}