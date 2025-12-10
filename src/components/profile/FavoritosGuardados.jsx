import { useState, useEffect } from "react";
import CardFavorito from "./CardFavorito";
import { fetchFavoritosHandler, toggleFavoritoHandler } from "../../handlers/favoritosHandler.js";

// Obtener la URL base del backend
const BASE_URL = import.meta.env.VITE_API_URL.replace('/api','');

export default function FavoritosGuardados() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar favoritos al montar el componente
  useEffect(() => {
    cargarFavoritos();
  }, []);

  const cargarFavoritos = async () => {
    try {
      setLoading(true);
      const data = await fetchFavoritosHandler();
      console.log('📋 Favoritos cargados:', data);
      setFavoritos(data || []);
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
      setFavoritos([]);
    } finally {
      setLoading(false);
    }
  };

  // Toggle favorito con actualización en tiempo real
  const toggleFavorito = async (postulacionId) => {
    setLoading(true);
    try {
      // Siempre es favorito en esta vista (porque estamos en "Mis favoritos")
      const isFavorito = true;
      
      console.log('🔄 Quitando favorito:', postulacionId);

      // Llamar al handler para remover
      const result = await toggleFavoritoHandler(isFavorito, postulacionId);

      console.log('✅ Resultado:', result);

      // Actualizar el estado con los favoritos que devuelve el backend
      if (result.favoritos) {
        setFavoritos(result.favoritos);
        console.log('✅ Favoritos actualizados:', result.favoritos.length);
      } else {
        // Si no hay favoritos en la respuesta, recargar
        await cargarFavoritos();
      }
      
    } catch (error) {
      console.error("❌ Error al actualizar favorito:", error);
      alert("Error al actualizar favorito. Intenta de nuevo.");
      // Recargar favoritos en caso de error
      await cargarFavoritos();
    } finally {
      setLoading(false);
    }
  };

  if (loading && favoritos.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-12">
            <p className="text-center text-gray-500">Cargando favoritos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <main className="max-w-3xl mx-auto flex-1 flex flex-col">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Cabecera */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Mis favoritos</h1>
            <p className="text-gray-600 mt-1">
              {favoritos.length} {favoritos.length === 1 ? 'resultado' : 'resultados'}
            </p>
          </div>

          {/* Contenido */}
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
                />
              ))
            )}
          </div>
        </div>
      </main>

      {/* Margen inferior para que el footer no tape el contenido */}
      <div className="h-24 sm:h-32" />
    </div>
  );
}