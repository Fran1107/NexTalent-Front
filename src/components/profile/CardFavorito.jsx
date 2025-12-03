import { ImageCardContent } from "./ImageCardContent";
import { CircleIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr";

export default function CardFavorito({ data }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">

      {/* Imagen dinámica */}
      {/* <ImageCardContent image={data.logoUrl} alt={data.empresa} /> */}

      {/* Contenido */}
      <div className="flex items-start justify-between mb-2">

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {data.titulo}
          </h3>

          {/* Nombre de la empresa */}
          <p className="text-gray-700 font-medium mb-2">
            {data.empresa?.nombre || "Empresa desconocida"}
          </p>

          <div className="flex items-center gap-4 ml-2">

            {/* Estado de la pasantía */}
            {data.estado && (
              <div className="flex items-center gap-2">
                <CircleIcon
                  className={`w-4 h-4 ${
                    data.estado === "Activa" ? "text-green-600" : "text-red-600"
                  }`}
                />
                <p className="text-sm text-gray-500">
                  {data.estado}
                </p>
              </div>
            )}

            {/* Modalidad */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                {data.modalidad}
              </span>
            </div>


          </div>


          {/* Descripción */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {data.descripcion}
          </p>

            {/* Duración */}
            {data.duracion && (
              <p className="text-sm text-gray-500 flex items-end justify-end">
                {data.duracion}
              </p>
            )}
        </div>


        {/* Botón de favorito */}
        <button className="text-gray-400 hover:text-red-400 transition-colors">
          <HeartIcon className="w-6 h-6" duotone="true" />
        </button>


      </div>
    </div>
  );
}
