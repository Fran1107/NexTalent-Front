import { useEffect, useState } from 'react';
import { getMisAplicaciones } from '../../API/aplicacionAPI.js';
import { getMyPostulacionesEmpresa, deletePostulacion } from '../../API/postulacionAPI.js';
// Importa auth para saber rol (asumiendo que guardas el rol en localStorage o Context)
// Si no, puedes intentar cargar ambas y ver cual no falla, o usar un prop.

export default function MisPostulacionesView() {
    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rol, setRol] = useState(''); // 'pasante' o 'empresa'

    useEffect(() => {
        // Detectar rol simple (ajusta según tu lógica de auth)
        const userType = localStorage.getItem('userType'); // o como lo guardes
        setRol(userType);
        cargarDatos(userType);
    }, []);

    const cargarDatos = async (tipoUsuario) => {
        try {
            if (tipoUsuario === 'pasante') {
                const data = await getMisAplicaciones();
                setLista(data.aplicaciones);
            } else {
                const data = await getMyPostulacionesEmpresa();
                setLista(data.postulaciones); // Ojo: el backend debe devolver { postulaciones: [] }
            }
        } catch (error) {
            console.error("Error cargando lista", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if(!confirm("¿Estás seguro de eliminar esta oferta?")) return;
        try {
            await deletePostulacion(id);
            // Recargar lista
            const data = await getMyPostulacionesEmpresa();
            setLista(data.postulaciones);
        } catch (error) {
            alert("Error al eliminar");
        }
    };

    if (loading) return <div className="p-10 text-center">Cargando...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 font-serif">
                {rol === 'pasante' ? 'Mis Postulaciones' : 'Mis Ofertas Publicadas'}
            </h1>

            {lista.length === 0 ? (
                <p className="text-gray-500">No hay registros para mostrar.</p>
            ) : (
                <div className="grid gap-4">
                    {lista.map((item) => (
                        <div key={item._id} className="bg-white p-5 rounded-lg shadow border border-gray-100 flex justify-between items-center">
                            
                            {/* --- CONTENIDO DE LA TARJETA --- */}
                            <div>
                                {/* Si soy pasante, item tiene 'postulacionId' populated */}
                                {/* Si soy empresa, item ES la postulacion */}
                                <h3 className="font-bold text-lg text-gray-800">
                                    {rol === 'pasante' ? item.postulacionId?.titulo : item.titulo}
                                </h3>
                                
                                <p className="text-sm text-gray-500">
                                    {rol === 'pasante' 
                                        ? `Empresa: ${item.empresaId?.nombreCorporativo}` 
                                        : `Estado: ${item.estado} | Modalidad: ${item.modalidad}`
                                    }
                                </p>
                                
                                {rol === 'pasante' && (
                                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold
                                        ${item.estado === 'Enviada' ? 'bg-yellow-100 text-yellow-800' : 
                                          item.estado === 'Aceptada' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {item.estado}
                                    </span>
                                )}
                            </div>

                            {/* --- BOTONES DE ACCIÓN (Solo Empresa por ahora) --- */}
                            {rol !== 'pasante' && (
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleDelete(item._id)}
                                        className="text-red-500 hover:bg-red-50 px-3 py-1 rounded border border-red-200 text-sm"
                                    >
                                        Eliminar
                                    </button>
                                    <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded border border-blue-200 text-sm">
                                        Ver Candidatos
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}