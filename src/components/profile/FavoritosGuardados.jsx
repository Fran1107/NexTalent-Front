import { useEffect, useState } from "react"; 
import CardFavorito from "./CardFavorito";
import { getFavoritos, addFavorito, removeFavorito } from "../../API/PasanteAPI";

// Obtener la URL base del backend
const BASE_URL = import.meta.env.VITE_API_URL.replace('/api','');

export default function FavoritosGuardados() {

  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar favoritos al montar
  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const data = await getFavoritos();
        setFavoritos(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavoritos();
  }, []);

  // Toggle favorito
  const toggleFavorito = async (pasantiaId) => {
    setLoading(true);
    try {
      const isFavorito = favoritos.some(f => f._id === pasantiaId);

      if (isFavorito) {
        await removeFavorito(pasantiaId);
        setFavoritos(prev => prev.filter(f => f._id !== pasantiaId));
      } else {
        const nuevaFav = await addFavorito(pasantiaId);
        setFavoritos(prev => [...prev, nuevaFav.pasantia]);
      }
    } catch (error) {
      console.error("Error al actualizar favoritos", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <main className="flex-1">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Mis favoritos</h1>
            <p className="text-gray-600 mt-1">{favoritos.length} resultados</p>
          </div>

          <div className="p-6">
            {favoritos.length === 0 ? (
              <p className="text-gray-500 text-center py-12">
                No tenés favoritos agregados todavía
              </p>
            ) : (
              favoritos.map(fav => (
                <CardFavorito 
                  key={fav._id}
                  data={fav}
                  isFavorito={true} // todos son favoritos aquí
                  toggleFavorito={toggleFavorito}
                  loading={loading}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
