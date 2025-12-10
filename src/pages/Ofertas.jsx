import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { getAllPostulaciones } from "../API/postulacionAPI.js"; 
import { crearAplicacion } from "../API/aplicacionAPI.js";
import { ModalMensajeExito, ModalMensajeError } from "../components/MessageModals";
import { MapPin, Briefcase, Building,ChevronRight } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');

export default function Ofertas() {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para los Modales
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  
  // Estado para spinner individual
  const [applyingId, setApplyingId] = useState(null);

  useEffect(() => {
    cargarOfertas();
  }, []);

  const cargarOfertas = async () => {
    try {
      const data = await getAllPostulaciones();
      if (Array.isArray(data)) setOfertas(data);
      else if (data.postulaciones) setOfertas(data.postulaciones);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostularse = async (ofertaId) => {
    setApplyingId(ofertaId); 
    try {
      await crearAplicacion({ postulacionId: ofertaId });
      setModalMsg("¡Te has postulado correctamente! La empresa recibió tu perfil.");
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      setModalMsg(error.error || "No pudimos procesar tu postulación. Verifica tu perfil.");
      setShowError(true);
    } finally {
      setApplyingId(null); 
    }
  };

  // --- FUNCIÓN HELPER PARA ARREGLAR LOGOS ---
  const getLogoUrl = (path) => {
    if (!path) return "https://via.placeholder.com/80";
    // Si ya viene con http (es de internet), lo dejamos tal cual
    if (path.startsWith('http')) return path; 
    // Si es una ruta local (subida por Multer), le pegamos el localhost
    return `${BASE_URL}/${path}`;
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Cargando pasantías...</div>;

  return (
    <div className="min-h-screen bg-[#F6F4FA] pt-10 px-4 pb-20">
      
      <h1 className="text-center text-2xl font-semibold text-gray-800 mb-8">
        Pasantías activas
      </h1>

      <p className="max-w-3xl mx-auto text-center text-gray-500 mb-8 font-sans">
        {ofertas.length} resultados encontrados
      </p>

      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {ofertas.map((o) => {
            const nombreEmpresa = o.empresaId?.nombre || o.empresaId?.nombreCorporativo || o.empresaNombre || "Empresa";
            
            // Usamos el helper aquí 👇
            const logoPath = o.empresaId?.logo || o.logo;
            const logoUrl = getLogoUrl(logoPath);

            return (
              <div
                key={o._id}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex gap-5 items-start"
              >
                {/* LOGO */}
                <div className="w-20 h-20 flex items-center justify-center bg-white border rounded-lg shadow-sm">
                  <img
                    src={logoUrl}
                    alt="logo"
                    className="w-full h-full object-contain"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/80" }} // Fallback si la imagen no carga
                  />
                </div>

                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">
                            Publicado el {new Date(o.createdAt).toLocaleDateString()}
                        </p>
                        <h2 className="text-xl font-semibold text-gray-900">
                            {o.titulo}
                        </h2>
                        <p className="text-indigo-600 font-medium text-sm mt-1 flex items-center gap-1">
                            <Building size={14}/> {o.empresa}
                        </p>
                    </div>
                  </div>

                  <p className="text-gray-600 mt-3 text-sm line-clamp-2 font-sans">
                    {o.descripcion}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-4 font-medium">
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                      <MapPin size={14}/> {o.lugar?.provincia}, {o.lugar?.localidad}
                    </span>

                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                        <Briefcase size={14}/> {o.modalidad}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center justify-between w-full md:w-auto mt-4 md:mt-0 gap-3">

                    <button className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>

                    <Link 
                        to={`/postulaciones/${o._id}`} 
                        className="md:mt-15 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-6 py-2 rounded-full font-medium transition text-sm flex items-center justify-center gap-1 whitespace-nowrap w-full md:w-auto group"
                    >
                        Ver Oferta <ChevronRight size={16} className="group-hover:translate-x-1 transition"/>
                    </Link>

                    <button 
                        onClick={() => handlePostularse(o._id)}
                        disabled={applyingId === o._id}
                        className={`md:mt-1 bg-[#6B2BEF] hover:bg-[#5722C6] text-white px-6 py-2 rounded-full font-medium transition
                            ${applyingId === o._id 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-[#6B2BEF] hover:bg-[#5722C6] active:scale-95 transform'
                            }`}
                    >
                        {applyingId === o._id ? 'Enviando...' : 'Postularme'}
                    </button>
                </div>
              </div>
            );
        })}
      </div>

      <ModalMensajeExito 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        title="¡Solicitud Enviada!"
        message={modalMsg}
      />
      <ModalMensajeError 
        isOpen={showError} 
        onClose={() => setShowError(false)} 
        title="No pudimos postularte"
        message={modalMsg}
      />

    </div>
  );
}