import { useEffect, useState } from 'react';
import { getMyPostulacionesEmpresa } from '../API/postulacionAPI';
import { Edit, Trash2, Users, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

// Misma lógica de URL
const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');

export default function MisPublicacionesView() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getMyPostulacionesEmpresa();
                setPublicaciones(Array.isArray(data) ? data : data.postulaciones || []);
            } catch (error) {
                console.error("Error cargando publicaciones", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    // --- HELPER DE IMÁGENES ---
    const getLogoUrl = (path) => {
        if (!path) return "https://via.placeholder.com/80";
        if (path.startsWith('http')) return path;
        return `${BASE_URL}/${path}`;
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Cargando tus ofertas...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 font-serif">Mis Ofertas Publicadas</h1>
                <Link to="/crear-oferta" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                    + Nueva Oferta
                </Link>
            </div>

            <div className="grid gap-4">
                {publicaciones.map((pub) => (
                    <div key={pub._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        
                        <div className="flex items-center gap-4 w-full md:w-auto">
                             {/* Mostramos el logo de la propia empresa (opcional, ya saben quiénes son) */}
                            <div className="w-14 h-14 border rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
                                <img 
                                    src={getLogoUrl(pub.empresaId?.logo)} 
                                    alt="Mi Logo" 
                                    className="object-contain w-full h-full"
                                    onError={(e) => e.target.src = "https://via.placeholder.com/80"}
                                />
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{pub.titulo}</h3>
                                <p className="text-sm text-gray-500 line-clamp-1">{pub.descripcion}</p>
                                <span className="text-xs text-gray-400 mt-1 block">
                                    Publicado: {new Date(pub.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        {/* ESTADÍSTICAS Y ACCIONES */}
                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                            
                            {/* Contador de candidatos (suponiendo que el backend te manda 'conteoAplicaciones') */}
                            <div className="flex flex-col items-center px-4 border-l border-r border-gray-100">
                                <span className="text-2xl font-bold text-indigo-600">{pub.conteoAplicaciones || 0}</span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Users size={12}/> Postulantes
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <button title="Ver detalle" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                                    <Eye size={20}/>
                                </button>
                                <button title="Editar" className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
                                    <Edit size={20}/>
                                </button>
                                <button title="Eliminar" className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                                    <Trash2 size={20}/>
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}