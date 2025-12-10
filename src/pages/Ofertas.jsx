import { useEffect, useState } from "react";
import useFavoritos from "../hooks/useFavoritos"; // <<--- IMPORTANTE

export default function Ofertas() {
  const [ofertas, setOfertas] = useState([]);

  // ----------------------------------------
  // FAVORITOS (hook reutilizable)
  // ----------------------------------------
  const { favoritos, toggleFavorito, loading } = useFavoritos();

  // Cargar ofertas
  useEffect(() => {
    fetch("http://localhost:3000/api/postulaciones")
      .then(res => res.json())
      .then(data => setOfertas(data))
      .catch(err => console.error("Error:", err));
  }, []);

  // Verifica si una oferta está en favoritos
  const isFavorito = (id) => favoritos.some(f => f._id === id);

  return (
    <div className="min-h-screen bg-[#F6F4FA] pt-10 px-4">
      
      {/* TÍTULO */}
      <h1 className="text-center text-2xl font-semibold text-gray-800 mb-8">
        Pasantías activas
      </h1>

      {/* CANTIDAD */}
      <p className="max-w-3xl mx-auto text-gray-600 mb-4">
        {ofertas.length} resultados
      </p>

      {/* LISTADO */}
      <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-20">
        {ofertas.map((o) => (
          <div
            key={o._id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex gap-5 items-start"
          >
            {/* LOGO */}
            <div className="w-20 h-20 flex items-center justify-center bg-white border rounded-lg shadow-sm">
              <img
                src={o.logo || "https://via.placeholder.com/80"}
                alt="logo"
                className="w-14 h-14 object-contain"
              />
            </div>

            {/* INFORMACIÓN */}
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Publicado ayer</p>

              <h2 className="text-xl font-semibold text-gray-900">
                {o.titulo}
              </h2>

              <p className="text-gray-700 font-medium mb-2">
                {o.empresa || "Empresa no especificada"}
              </p>

              <p className="text-gray-600 mb-3">
                {o.descripcion}
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                <span>
                  📍 {o.lugar?.provincia}, {o.lugar?.localidad}
                </span>

                <span>💼 {o.modalidad}</span>
              </div>

              {/* BOTÓN */}
              <button className="bg-[#6B2BEF] hover:bg-[#5722C6] text-white px-6 py-2 rounded-full font-medium transition">
                Postularme
              </button>
            </div>

            {/* BOTÓN DE FAVORITO */}
            <div
              className={`text-2xl cursor-pointer select-none transition-transform ${
                loading ? "opacity-50 pointer-events-none" : "hover:scale-125"
              }`}
              onClick={() => toggleFavorito(o._id)}
            >
              {isFavorito(o._id) ? "❤️" : "🤍"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

