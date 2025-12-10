import useFavoritos from "../../hooks/useFavoritos.js";
import CardFavorito from "./CardFavorito";
import { getFavoritos, addFavorito, removeFavorito } from "../../API/pasanteApi.js";

// Obtener la URL base del backend
const BASE_URL = import.meta.env.VITE_API_URL.replace('/api','');

export default function FavoritosGuardados() {
  const { favoritos, loading, toggleFavorito } = useFavoritos();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <main className="max-w-3xl mx-auto flex-1 flex flex-col">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Cabecera */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Mis favoritos</h1>
            <p className="text-gray-600 mt-1">{favoritos.length} resultados</p>
          </div>

          {/* Contenido */}
          <div className="p-6 flex flex-col gap-4">
            {favoritos.length === 0 ? (
              <p className="text-gray-500 text-center py-12">
                No tenés favoritos agregados todavía
              </p>
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
