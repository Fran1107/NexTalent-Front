import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostulacionById } from '../../API/postulacionAPI.js';
import { crearAplicacion } from '../../API/aplicacionAPI.js';
import { ModalMensajeExito, ModalMensajeError } from '../../components/MessageModals';
import { MapPin, Building, Briefcase, Clock, CheckCircle } from 'lucide-react';

export default function PostulacionDetailView() {
    const { id } = useParams();
    const [oferta, setOferta] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Estados para postulación
    const [mensaje, setMensaje] = useState('');
    const [isApplying, setIsApplying] = useState(false); // Para mostrar spinner en el botón

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
            setOferta(data.postulacion);
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

    if (loading) return <div className="p-10 text-center">Cargando oferta...</div>;
    if (!oferta) return <div className="p-10 text-center text-red-500">Oferta no encontrada</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Cabecera */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">{oferta.titulo}</h1>
                        <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                            <span className="flex items-center gap-1"><Building size={16}/> {oferta.empresaId?.nombre}</span>
                            <span className="flex items-center gap-1"><MapPin size={16}/> {oferta.lugar.localidad}, {oferta.lugar.provincia}</span>
                            <span className="flex items-center gap-1"><Briefcase size={16}/> {oferta.modalidad}</span>
                        </div>
                    </div>
                    
                    {/* Botón de Acción */}
                    <div className="w-full md:w-auto">
                        <button 
                            onClick={handlePostularme}
                            disabled={isApplying}
                            className={`w-full md:w-auto px-8 py-3 rounded-full font-bold text-white shadow-md transition-transform transform active:scale-95 
                                ${isApplying ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {isApplying ? 'Enviando...' : 'Postularme Ahora'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="grid md:grid-cols-3 gap-6">
                
                {/* Columna Izquierda: Descripción */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 font-serif">Descripción del puesto</h2>
                        <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                            {oferta.descripcion}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 font-serif">Mensaje opcional</h2>
                        <textarea
                            className="w-full border-gray-300 rounded-lg p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                            rows="3"
                            placeholder="Escribe un mensaje corto para la empresa (opcional)..."
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                        />
                    </div>
                </div>

                {/* Columna Derecha: Requisitos y Detalles */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <CheckCircle size={20} className="text-green-500"/> Requisitos
                        </h3>
                        <ul className="space-y-2">
                            {oferta.requisitos && oferta.requisitos.map((req, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span> {req}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Modales */}
            <ModalMensajeExito 
                isOpen={showSuccess} 
                title="¡Postulación Enviada!" 
                message={modalMsg} 
                onClose={() => setShowSuccess(false)} 
            />
            <ModalMensajeError 
                isOpen={showError} 
                title="No pudimos postularte" 
                message={modalMsg} 
                onClose={() => setShowError(false)} 
            />
        </div>
    );
}