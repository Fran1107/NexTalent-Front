import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostulacionById } from '../../API/postulacionAPI.js';
import { crearAplicacion } from '../../API/aplicacionAPI.js';
import { ModalMensajeExito, ModalMensajeError } from '../../components/MessageModals';
import { MapPin, Building, Briefcase, CheckCircle, Calendar } from 'lucide-react';

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
            setOferta(data.postulacion || data);
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
            setModalMsg(error.error || "Error al postularse. Verifica que tengas tu CV cargado.");
            setShowError(true);
        } finally {
            setIsApplying(false);
        }
    };

    // --- HELPER DE IMÁGENES ---
    const getLogoUrl = (path) => {
        if (!path) return "https://via.placeholder.com/80";
        if (path.startsWith('http')) return path; 
        return `${BASE_URL}/${path}`;
    };

    if (loading) return <div className="text-center py-20 text-gray-500">Cargando detalles...</div>;
    if (!oferta) return <div className="text-center py-20 text-red-500 font-medium">Oferta no encontrada.</div>;

    // Datos procesados
    const logoPath = oferta.logo || oferta.empresaId?.logo;
    const logoUrl = getLogoUrl(logoPath);
    const nombreEmpresa = oferta.empresaId?.nombre || oferta.empresaId?.nombreCorporativo || "Empresa";
    const fecha = new Date(oferta.createdAt).toLocaleDateString();

    return (
        <div className="min-h-screen bg-[#F6F4FA] pt-10 px-4 pb-20">
            <div className="container mx-auto max-w-5xl">
                
                {/* --- CABECERA (Tarjeta Principal) --- */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-6 flex flex-col md:flex-row gap-6 items-start">
                    
                    {/* Logo (Estilo contenedor igual al listado pero más grande) */}
                    <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center bg-white border rounded-lg shadow-sm overflow-hidden">
                        <img 
                            src={logoUrl} 
                            alt="Logo Empresa" 
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/150" }} 
                        />
                    </div>

                    <div className="flex-1 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                                    <Calendar size={14}/> Publicado el {fecha}
                                </p>
                                <h1 className="text-3xl font-semibold text-gray-900 mb-2 leading-tight">
                                    {oferta.titulo}
                                </h1>
                                
                                <p className="text-indigo-600 font-medium text-base flex items-center gap-1 mb-4">
                                    <Building size={16}/> {oferta.empresa}
                                </p>

                                {/* Badges (Igual que en MisPostulacionesView) */}
                                <div className="flex flex-wrap gap-3 text-xs text-gray-500 font-medium">
                                    <span className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded border border-gray-100">
                                        <MapPin size={14}/> {oferta.lugar?.localidad || 'Ubicación'}, {oferta.lugar?.provincia}
                                    </span>
                                    <span className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded border border-gray-100">
                                        <Briefcase size={14}/> {oferta.modalidad}
                                    </span>
                                </div>
                            </div>

                            {/* Botón de Acción Principal (Color #6B2BEF) */}
                            <div className="w-full md:w-auto mt-4 md:mt-0">
                                <button 
                                    onClick={handlePostularme}
                                    disabled={isApplying}
                                    className={`w-full md:w-auto px-8 py-3 rounded-full font-medium text-white shadow-sm transition-transform active:scale-95 
                                        ${isApplying 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-[#6B2BEF] hover:bg-[#5722C6]'
                                        }`}
                                >
                                    {isApplying ? 'Enviando...' : 'Postularme Ahora'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CONTENIDO PRINCIPAL --- */}
                <div className="grid md:grid-cols-3 gap-6">
                    
                    {/* Columna Izquierda: Descripción */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                                Acerca del puesto
                            </h2>
                            {/* Texto con saltos de línea y color gris oscuro */}
                            <div className="text-gray-600 whitespace-pre-line leading-relaxed text-base font-sans">
                                {oferta.descripcion}
                            </div>
                        </div>

                        {/* Caja de Mensaje Opcional */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">Mensaje para la empresa</h2>
                            <p className="text-sm text-gray-400 mb-4">
                                ¿Quieres destacar? Escribe un breve mensaje (Opcional).
                            </p>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:ring-2 focus:ring-[#6B2BEF] focus:border-transparent outline-none transition resize-none"
                                rows="4"
                                placeholder="Hola, soy..."
                                value={mensaje}
                                onChange={(e) => setMensaje(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Columna Derecha: Requisitos */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-6">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                                <CheckCircle size={20} className="text-[#6B2BEF]"/> Requisitos
                            </h3>
                            
                            {oferta.requisitos && oferta.requisitos.length > 0 ? (
                                <ul className="space-y-3">
                                    {oferta.requisitos.map((req, i) => (
                                        <li key={i} className="text-sm text-gray-600 flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <div className="min-w-[6px] h-[6px] rounded-full bg-[#6B2BEF] mt-2"></div>
                                            <span className="leading-snug">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-400 italic">No se especificaron requisitos.</p>
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
        </div>
    );
}