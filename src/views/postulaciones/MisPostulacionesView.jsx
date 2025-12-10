import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMisAplicaciones } from '../../API/aplicacionAPI.js';
import { getAllPostulaciones } from '../../API/postulacionAPI.js'; // Importamos la que trae todas
import { Building, MapPin, Calendar, ChevronRight } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');

export default function MisPostulacionesView() {
    // Estado para la lista combinada final
    const [listaCombinada, setListaCombinada] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarYCruzarDatos = async () => {
            try {
                // 1. Llamamos a las dos funciones en paralelo
                const [resOfertas, resAplicaciones] = await Promise.all([
                    getAllPostulaciones(),
                    getMisAplicaciones()
                ]);

                // 2. Normalizamos la data (por si vienen en { postulaciones: [...] } o directo array)
                const todasLasOfertas = Array.isArray(resOfertas) ? resOfertas : (resOfertas.postulaciones || []);
                const misAplicaciones = Array.isArray(resAplicaciones) ? resAplicaciones : (resAplicaciones.aplicaciones || []);

                // 3. HACEMOS EL CRUCE (El "Filtro" que pediste)
                // Recorremos mis aplicaciones y le pegamos la info de la oferta correspondiente
                const dataFinal = misAplicaciones.map((app) => {
                    // Obtenemos el ID limpio de la oferta asociada a esta aplicación
                    // (A veces viene populado como objeto, a veces como string)
                    const idBuscado = typeof app.postulacionId === 'object' 
                        ? app.postulacionId._id 
                        : app.postulacionId;

                    // Buscamos la oferta original en el array grande (donde los logos SÍ funcionan)
                    const ofertaOriginal = todasLasOfertas.find(oferta => oferta._id === idBuscado);

                    return {
                        ...app, // Mantenemos estado, fecha, etc. de la aplicación
                        ofertaData: ofertaOriginal || {} // Guardamos la info "buena" aquí
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
                <h1 className="text-2xl font-bold font-serif text-gray-800 mb-6 border-b pb-4">
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
                    <div className="flex flex-col gap-4">
                        {listaCombinada.map((item) => {
                            // Ahora usamos 'item.ofertaData' que viene de getAllPostulaciones
                            const oferta = item.ofertaData; 
                            // Ojo: en getAllPostulaciones, la empresa a veces viene populada como 'empresaId'
                            const empresa = oferta.empresaId || {}; 

                            // Aquí tomamos el logo de la oferta original (tal como funciona en tu vista de Ofertas)
                            // Si en Ofertas usabas 'empresaId.logo' o 'oferta.logo', aquí será igual.
                            const rutaLogo = empresa.logo || oferta.logo;
                            const logoUrl = getLogoUrl(rutaLogo);
                            const fecha = new Date(item.createdAt).toLocaleDateString();

                            return (
                                <div key={item._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col md:flex-row gap-6 items-center">
                                    
                                    {/* LOGO (Traído de la lista maestra) */}
                                    <div className="w-16 h-16 flex-shrink-0 bg-white border rounded-lg p-1 flex items-center justify-center overflow-hidden">
                                        <img 
                                            src={logoUrl} 
                                            alt="Logo" 
                                            className="w-full h-full object-contain"
                                            onError={(e) => e.target.src = "https://via.placeholder.com/80"}
                                        />
                                    </div>

                                    {/* Info Principal */}
                                    <div className="flex-1 w-full text-center md:text-left">
                                        <h3 className="text-lg font-bold text-gray-900 font-serif">
                                            {oferta.titulo || "Oferta no disponible"}
                                        </h3>
                                        <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-1 mt-1">
                                            {/* Intentamos obtener nombre de empresa de varios lados por si acaso */}
                                            <Building size={14}/> {empresa.nombre || empresa.nombreCorporativo || "Empresa"}
                                        </p>
                                        
                                        <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-3 text-xs text-gray-500">
                                            <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                                <Calendar size={12}/> Aplicado: {fecha}
                                            </span>
                                            {oferta.lugar && (
                                                <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                                    <MapPin size={12}/> 
                                                    {oferta.lugar.localidad || oferta.lugar.provincia || "Ubicación"}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Estado y Acción */}
                                    <div className="flex flex-col items-center gap-3 min-w-[140px]">
                                        <span className={`px-4 py-1 rounded-full text-xs font-bold border ${getStatusColor(item.estado)}`}>
                                            {item.estado || 'Enviada'}
                                        </span>
                                        
                                        {oferta._id && (
                                            <Link 
                                                to={`/postulaciones/${oferta._id}`} 
                                                className="text-indigo-600 text-sm font-medium hover:text-indigo-800 flex items-center gap-1 group"
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