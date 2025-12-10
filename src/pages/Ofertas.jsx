import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { getAllPostulaciones } from "../API/postulacionAPI.js"; 
import { crearAplicacion } from "../API/aplicacionAPI.js";
import { ModalMensajeExito, ModalMensajeError } from "../components/MessageModals";
import { MapPin, Briefcase, Building, ChevronRight } from 'lucide-react';
import { BotonFavorito } from "../components/profile/CardFavorito.jsx";

import { fetchFavoritosHandler, toggleFavoritoHandler } from "../handlers/favoritosHandler.js";

const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');

export default function Ofertas() {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎯 Estado de favoritos
  const [favoritos, setFavoritos] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Otros estados que ya tenías
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [applyingId, setApplyingId] = useState(null);

  // =========================
  // 🟣 CARGAR OFERTAS Y FAVORITOS
  // =========================
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      // Cargar ofertas
      const data = await getAllPostulaciones();
      if (Array.isArray(data)) setOfertas(data);
      else if (data.postulaciones) setOfertas(data.postulaciones);

      // Cargar favoritos
      const favData = await fetchFavoritosHandler();
      console.log('📋 Favoritos cargados:', favData);
      setFavoritos(favData || []);
      
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 🟣 TOGGLE FAVORITO 
  // =========================
  const handleToggleFavorito = async (postulacionId) => {
    setIsUpdating(true);
    try {
      // Verificar si ya es favorito
      const isFavorito = favoritos.some(f => f._id === postulacionId);
      
      console.log('🔄 Toggle favorito:', postulacionId, 'isFavorito:', isFavorito);

      // Llamar al handler
      const result = await toggleFavoritoHandler(isFavorito, postulacionId);

      console.log('✅ Resultado:', result);

      // Actualizar el estado con los favoritos que devuelve el backend
      if (result.favoritos) {
        setFavoritos(result.favoritos);
        console.log('✅ Favoritos actualizados:', result.favoritos.length);
      }
      
    } catch (error) {
      console.error("❌ Error al actualizar favorito:", error);
      alert("Error al actualizar favorito. Intenta de nuevo.");
    } finally {
      setIsUpdating(false);
    }
  };

  // =========================
  // 🟣 POSTULARSE
  // =========================
  const handlePostularse = async (postulacionId) => {
    setApplyingId(postulacionId);
    try {
      const response = await crearAplicacion(postulacionId);
      setModalMsg(response.message || "Tu postulación fue enviada con éxito");
      setShowSuccess(true);
    } catch (error) {
      setModalMsg(error.message || "Error al postularte");
      setShowError(true);
    } finally {
      setApplyingId(null);
    }
  };

  // Helper para logos
  const getLogoUrl = (path) => {
    if (!path) return "https://via.placeholder.com/80";
    if (path.startsWith('http')) return path;
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
          const logoPath = o.empresaId?.logo || o.logo;
          const logoUrl = getLogoUrl(logoPath);
          
          // ✅ Verificar si esta oferta es favorita
          const esFavorito = favoritos.some(f => f._id === o._id);

          return (
            <div key={o._id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex gap-5 items-start">
              
              {/* LOGO */}
              <div className="w-20 h-20 flex items-center justify-center bg-white border rounded-lg shadow-sm">
                <img
                  src={logoUrl}
                  alt="logo"
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/80"; }}
                />
              </div>

              {/* Contenido */}
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
                      <Building size={14}/> {o.empresa || "Empresa"}
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

              {/* Acciones: favorito, ver oferta, postular */}
              <div className="flex flex-row md:flex-col items-center justify-between w-full md:w-auto mt-4 md:mt-0 gap-3">

                {/* ✅ Botón de favorito corregido */}
                <div>
                  <BotonFavorito
                    isFavorito={esFavorito}
                    onClick={() => handleToggleFavorito(o._id)}
                    disabled={isUpdating}
                    isLoading={isUpdating}
                  />
                </div>

                <Link 
                  to={`/postulaciones/${o._id}`} 
                  className="md:mt-15 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-6 py-2 rounded-full font-medium transition text-sm flex items-center justify-center gap-1 whitespace-nowrap w-full md:w-auto group"
                >
                  Ver Oferta <ChevronRight size={16} className="group-hover:translate-x-1 transition"/>
                </Link>

                <button 
                  onClick={() => handlePostularse(o._id)}
                  disabled={applyingId === o._id}
                  className={`md:mt-1 bg-[#6B2BEF] hover:bg-[#5722C6] text-white px-6 py-2 rounded-full font-medium transition text-sm
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