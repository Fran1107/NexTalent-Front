import { HeartIcon, ArrowBendDownRightIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom"

export default function CardFavorito({ data, isFavorito, toggleFavorito, loading }) {
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

        {/* Contenido principal en el centro */}
        <div className="flex-1 min-w-0">
          
          {/* Título y empresa */}
          <div className="mb-3">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 truncate">
              {data.titulo}
            </h3>
            <p className="text-gray-700 font-medium text-sm sm:text-base">
              {data.empresa || "Empresa desconocida"}
            </p>
          </div>

          {/* Estado, modalidad y duración */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
            {data.isActive && (
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                    data.isActive === "true" ? "bg-green-600" : "bg-red-600"
                  }`}
                />
                <p className="text-xs sm:text-sm text-gray-600">
                  {data.isActive === "true" ? "Activa" : "Inactiva"}
                </p>
              </div>
            )}

            {data.modalidad && (
              <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-xs sm:text-sm">
                {data.modalidad}
              </span>
            )}

            {data.duracion && (
              <p className="text-xs sm:text-sm text-gray-600">{data.duracion}</p>
            )}
          </div>

          {/* Descripción */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 p-2">
            {data.descripcion}
          </p>

        <Link
          to={`/postulaciones/${data._id}`}
          className="inline-flex items-end gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Ver postulación
          <ArrowBendDownRightIcon size={16} weight="bold" />
        </Link>
        </div>

        {/* Botón de favorito a la derecha */}
        <div className="shrink-0">
          <button
            onClick={() => toggleFavorito(data._id)}
            disabled={loading}
            className="transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed p-2"
            aria-label={isFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <HeartIcon
              size={24}
              weight={isFavorito ? "fill" : "regular"}
              className={`transition-colors ${
                isFavorito 
                  ? "text-red-600" 
                  : "text-gray-400 hover:text-red-600"
              }`}
            />
          </button>          
        </div>


      </div>
    </div>
  );
}