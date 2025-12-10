import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostulacionById } from '../../API/postulacionAPI.js';
import { crearAplicacion } from '../../API/aplicacionAPI.js';
import { ModalMensajeExito, ModalMensajeError } from '../../components/MessageModals';
import { MapPin, Building, Briefcase, CheckCircle } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');

export default function PostulacionDetailView() {
    const { id } = useParams();
    const [oferta, setOferta] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Estados para postulación
    const [mensaje, setMensaje] = useState('');
    const [isApplying, setIsApplying] = useState(false);

    // Modales
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

    useEffect(() => {
        cargarOferta();
    }, [id]);

    const cargarOferta = async () => {
        try {
            const data = await getPostulacionById(id);
            setOferta(data.postulacion || data); // Ajuste por si devuelve el objeto directo
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePostularme = async () => {
        setIsApplying(true);
        try {
            await crearAplicacion({ 
                postulacionId: id, 
                mensaje: mensaje 
            });
            setModalMsg("¡Te has postulado correctamente! La empresa revisará tu perfil.");
            setShowSuccess(true);
        } catch (error) {
            // Si el backend ya valida duplicados, mostrará el mensaje aquí
            setModalMsg(error.error || "Error al postularse. Verifica que tengas tu CV cargado o si ya te postulaste.");
            setShowError(true);
        } finally {
            setIsApplying(false);
        }
    };

    // --- HELPER DE IMÁGENES (Igual que en tus otras vistas) ---
    const getLogoUrl = (path) => {
        if (!path) return "https://via.placeholder.com/80";
        if (path.startsWith('http')) return path; 
        return `${BASE_URL}/${path}`;
    };

    if (loading) return <div className="p-20 text-center text-gray-500">Cargando detalles de la oferta...</div>;
    if (!oferta) return <div className="p-20 text-center text-red-500 font-bold">Oferta no encontrada o eliminada.</div>;

    // Lógica para obtener el logo (prioridad oferta -> luego empresa)
    const logoPath = oferta.logo || oferta.empresaId?.logo;
    const logoUrl = getLogoUrl(logoPath);
    const nombreEmpresa = oferta.empresaId?.nombre || oferta.empresaId?.nombreCorporativo || "Empresa Confidencial";

    return (
        <div className="container mx-auto px-4 py-10 max-w-5xl bg-[#F6F4FA] min-h-screen">
            
            {/* Cabecera de la Oferta */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 border border-gray-100 flex flex-col md:flex-row gap-6 items-start">
                
                {/* LOGO GRANDE */}
                <div className="w-24 h-24 flex-shrink-0 bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-center overflow-hidden shadow-sm">
                    <img 
                        src={logoUrl} 
                        alt="Logo Empresa" 
                        className="w-full h-full object-contain"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Logo" }} 
                    />
                </div>

                <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2 leading-tight">
                                {oferta.titulo}
                            </h1>
                            
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 text-sm font-medium mt-3">
                                <span className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                    <Building size={16}/> {nombreEmpresa}
                                </span>
                                <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                                    <MapPin size={16}/> {oferta.lugar?.localidad || 'Ubicación'}, {oferta.lugar?.provincia}
                                </span>
                                <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                                    <Briefcase size={16}/> {oferta.modalidad}
                                </span>
                            </div>
                        </div>

                        {/* Botón de Acción Principal */}
                        <div className="w-full md:w-auto mt-4 md:mt-0">
                            <button 
                                onClick={handlePostularme}
                                disabled={isApplying}
                                className={`w-full md:w-auto px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all transform active:scale-95 
                                    ${isApplying 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200'
                                    }`}
                            >
                                {isApplying ? 'Enviando...' : 'Postularme Ahora'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido Principal (Grid 2 columnas) */}
            <div className="grid md:grid-cols-3 gap-6">
                
                {/* Columna Izquierda: Descripción (Ocupa 2 espacios) */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 font-serif border-b pb-2">
                            Acerca del puesto
                        </h2>
                        <div className="text-gray-600 whitespace-pre-line leading-relaxed text-base">
                            {oferta.descripcion}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 font-serif">Mensaje para la empresa</h2>
                        <p className="text-sm text-gray-400 mb-3">
                            Puedes explicar brevemente por qué te interesa este puesto (Opcional).
                        </p>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                            rows="4"
                            placeholder="Hola, me interesa mucho esta vacante porque..."
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                        />
                    </div>
                </div>

                {/* Columna Derecha: Requisitos y Detalles (Ocupa 1 espacio) */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                            <CheckCircle size={20} className="text-green-500"/> Requisitos
                        </h3>
                        
                        {oferta.requisitos && oferta.requisitos.length > 0 ? (
                            <ul className="space-y-3">
                                {oferta.requisitos.map((req, i) => (
                                    <li key={i} className="text-sm text-gray-600 flex items-start gap-3 bg-gray-50 p-2 rounded-lg">
                                        <div className="min-w-[6px] h-[6px] rounded-full bg-indigo-500 mt-2"></div>
                                        <span className="leading-snug">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-400 italic">No se especificaron requisitos particulares.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Modales */}
            <ModalMensajeExito 
                isOpen={showSuccess} 
                title="¡Solicitud Enviada!" 
                message={modalMsg} 
                onClose={() => setShowSuccess(false)} 
            />
            <ModalMensajeError 
                isOpen={showError} 
                title="Atención" 
                message={modalMsg} 
                onClose={() => setShowError(false)} 
            />
        </div>
    );
}