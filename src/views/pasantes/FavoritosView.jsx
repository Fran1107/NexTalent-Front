import { useState } from "react";
import FavoritoHeroBanner from "../../components/profile/FavoritoHeroBanner";
import FavoritosGuardados from "../../components/profile/FavoritosGuardados";
import DetallePostulacion from "../../components/profile/DetallePostulacion";

export default function FavoritosView() {
  const [postulacionSeleccionada, setPostulacionSeleccionada] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 justify-center">
        <FavoritoHeroBanner image="/img/Hero-banner-favoritos.png" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 py-6">
        {/* Panel izquierdo: Lista de favoritos */}
        <div className="overflow-auto">
          <FavoritosGuardados 
            onSeleccionar={setPostulacionSeleccionada}
            seleccionadaId={postulacionSeleccionada?._id}
          /> 
        </div>
        
        {/* Panel derecho: Detalles */}
        <div className="sticky top-6 h-fit">
          {postulacionSeleccionada ? (
            <DetallePostulacion postulacion={postulacionSeleccionada} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-400 text-lg">
                Seleccioná una postulación para ver los detalles
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}