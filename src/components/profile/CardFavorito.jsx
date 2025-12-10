import { Heart, HeartIcon } from "@phosphor-icons/react";

export default function CardFavorito({ data, isFavorito, toggleFavorito, loading }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 ">
      
      {/* Contenido principal */}
      <div className="flex items-start justify-between mb-2">

        <div>
            {/* LOGO */}
            <div className="w-20 h-20 flex items-center justify-center bg-white border rounded-lg shadow-sm">
              <img
                src={data.logo || "https://via.placeholder.com/80"}
                alt="logo"
                className="w-14 h-14 object-contain"
              />
            </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {data.titulo}
          </h3>
          <p className="text-gray-700 font-medium mb-2">
            {data.empresa || "Empresa desconocida"}
          </p>

          {/* Estado, modalidad y duración */}
          <div className="flex items-center gap-4 ml-2">
            {data.isActive && (
              <div className="flex items-center gap-2">
                <span
                  className={`w-4 h-4 rounded-full ${
                    data.isActive === "true" ? "bg-green-600" : "bg-red-600"
                  }`}
                />
                <p className="text-sm text-gray-500">{data.isActive}</p>
              </div>
            )}

            {data.modalidad && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm">
                {data.modalidad}
              </span>
            )}

            {data.duracion && (
              <p className="text-sm text-gray-500">{data.duracion}</p>
            )}
          </div>

          {/* Descripción */}
          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            {data.descripcion}
          </p>
        </div>

        {/* Botón de favorito */}
        <button
          onClick={() => toggleFavorito(data._id)}
          disabled={loading}
          className="transition-colors"
        >
          <HeartIcon
            size={24}
            weight={isFavorito ? "fill" : "regular"} // fill = corazón completo, regular = solo borde
            className={isFavorito ? "text-red-600" : "text-gray-400 hover:text-red-800"}
          />
        </button>

      </div>
    </div>
  );
}
