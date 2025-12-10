import { HeartIcon, ArrowBendDownRightIcon } from "@phosphor-icons/react"; 
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"

// Subcomponente reutilizable de botón de favorito
export function BotonFavorito({ isFavorito = false, onClick, disabled = false, size = 24, isLoading = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed p-2 relative"
      aria-label={isFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {isLoading ? (
        // Spinner mientras carga
        <div className="w-6 h-6 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin" />
      ) : (
        <HeartIcon
          size={size}
          weight={isFavorito ? "fill" : "regular"}
          className={`transition-all duration-300 ${
            isFavorito 
              ? "text-red-600 scale-110" 
              : "text-gray-400 hover:text-red-600 scale-100"
          }`}
        />
      )}
    </button>
  );
}

// Componente principal CardFavorito
export default function CardFavorito({ data, isFavorito, toggleFavorito, loading }) {
  const [isUpdating, setIsUpdating] = useState(false);
  // ✅ Estado local optimista - se actualiza inmediatamente
  const [localIsFavorito, setLocalIsFavorito] = useState(isFavorito);
  
  const handleToggle = async () => {
    // ✅ Actualización optimista - cambia el UI inmediatamente
    const nuevoEstado = !localIsFavorito;
    setLocalIsFavorito(nuevoEstado);
    setIsUpdating(true);
    
    try {
      // Llamar al backend
      await toggleFavorito(data._id);
      // El estado global se actualizará desde el padre
      console.log('✅ Favorito actualizado correctamente');
    } catch (error) {
      // ❌ Si falla, revertir el cambio optimista
      console.error("Error al actualizar favorito:", error);
      setLocalIsFavorito(!nuevoEstado); // Revertir
      alert("Error al actualizar favorito. Intenta de nuevo.");
    } finally {
      setIsUpdating(false);
    }
  };

  // ✅ Sincronizar estado local con prop cuando cambie
    useEffect(() => {
    setLocalIsFavorito(isFavorito);
  }, [isFavorito]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Logo a la izquierda */}
        <div className="shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white border rounded-lg shadow-sm">
            <img
              src={data.logo || "https://via.placeholder.com/80"}
              alt="logo empresa"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
            />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          <div className="mb-3">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 truncate">
              {data.titulo}
            </h3>
            <p className="text-gray-700 font-medium text-sm sm:text-base">
              {data.empresa || "Empresa desconocida"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
            {data.estado && (
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 sm:w-2 sm:h-2 rounded-full ${
                    data.estado === "Activa" ? "bg-green-300" : "bg-gray-300"
                  }`}
                />
                <p className="text-xs sm:text-sm text-gray-600">
                  {data.estado === "Activa" ? "Activa" : "Cerrada"}
                </p>
              </div>
            )}

            {data.modalidad && (
              <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-xs sm:text-sm">
                {data.modalidad}
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">
            {data.descripcion}
          </p>

          <Link
            to={`/postulaciones/${data._id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Ver postulación
            <ArrowBendDownRightIcon size={16} weight="bold" />
          </Link>
        </div>

        {/* Botón de favorito a la derecha */}
        <div className="shrink-0">
          <BotonFavorito
            isFavorito={localIsFavorito}
            onClick={handleToggle}
            disabled={loading}
            isLoading={isUpdating}
          />
        </div>
      </div>
    </div>
  );
}