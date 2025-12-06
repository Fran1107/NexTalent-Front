import React, { useEffect, useState } from "react";
import { getPostulaciones } from "../services/postulacionesService";

const OfertasList = () => {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    const fetchOfertas = async () => {
      const data = await getPostulaciones();
      setOfertas(data);
    };
    fetchOfertas();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-6">Pasantías activas</h2>
      <p className="text-gray-500 mb-4">{ofertas.length} resultados</p>

      <div className="space-y-6">
        {ofertas.map((oferta) => (
          <div
            key={oferta._id}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={oferta.logo || "/placeholder-logo.png"}
                alt="Logo"
                className="w-14 h-14 object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold">{oferta.titulo}</h3>
                <p className="text-gray-600">{oferta.empresa}</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {oferta.descripcion}
            </p>

            <div className="flex justify-between items-center">
              <div className="flex flex-col text-gray-600">
                <span>📍 {oferta.ubicacion}</span>
                <span>💼 {oferta.modalidad}</span>
              </div>

              <button className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition">
                Postularme
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfertasList;
