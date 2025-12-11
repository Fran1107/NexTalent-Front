import { useState, useEffect } from "react";
import CardFavorito from "./CardFavorito";
import { fetchFavoritosHandler, toggleFavoritoHandler } from "../../handlers/favoritosHandler.js";

export default function FavoritosGuardados({ onSeleccionar, seleccionadaId }) {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarFavoritos();
  }, []);

  const cargarFavoritos = async () => {
    try {
      setLoading(true);
      const data = await fetchFavoritosHandler();
      console.log('📋 Favoritos cargados:', data);
      setFavoritos(data || []);
      
      // Si hay favoritos y ninguno está seleccionado, seleccionar el primero
      if (data && data.length > 0 && !seleccionadaId) {
        onSeleccionar(data[0]);
      }
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
      setFavoritos([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorito = async (postulacionId) => {
    setLoading(true);
    try {
      const isFavorito = true;
      console.log('🔄 Quitando favorito:', postulacionId);

      const result = await toggleFavoritoHandler(isFavorito, postulacionId);

      if (result.favoritos) {
        setFavoritos(result.favoritos);
        
        // Si se quitó el favorito seleccionado, limpiar selección
        if (postulacionId === seleccionadaId) {
          onSeleccionar(null);
        }
        
        console.log('✅ Favoritos actualizados:', result.favoritos.length);
      } else {
        await cargarFavoritos();
      }
      
    } catch (error) {
      console.error("❌ Error al actualizar favorito:", error);
      alert("Error al actualizar favorito. Intenta de nuevo.");
      await cargarFavoritos();
    } finally {
      setLoading(false);
    }
  };

  if (loading && favoritos.length === 0) {
    return (
      <div className="bg-gray-50 p-4 sm:p-6">
        <div className="bg-white rounded-lg shadow-sm p-12">
          <p className="text-center text-gray-500">Cargando favoritos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Mis favoritos</h1>
          <p className="text-gray-600 mt-1">
            {favoritos.length} {favoritos.length === 1 ? 'resultado' : 'resultados'}
          </p>
        </div>

        <div className="p-6 flex flex-col gap-4">
          {favoritos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-2">
                No tenés favoritos agregados todavía
              </p>
              <p className="text-gray-400 text-sm">
                Explorá las ofertas y agregá las que más te interesen
              </p>
            </div>
          ) : (
            favoritos.map((fav) => (
              <CardFavorito
                key={fav._id}
                data={fav}
                isFavorito={true}
                toggleFavorito={toggleFavorito}
                loading={loading}
                onSelect={() => onSeleccionar(fav)}
                isSelected={fav._id === seleccionadaId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}