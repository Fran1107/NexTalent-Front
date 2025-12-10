// src/hooks/useFavoritos.js
import { useEffect, useState } from "react";
import { fetchFavoritosHandler, toggleFavoritoHandler } from "../handlers/favoritosHandler";

export default function useFavoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar favoritos al montar
  useEffect(() => {
    const loadFavoritos = async () => {
      try {
        const data = await fetchFavoritosHandler();
        setFavoritos(data); // data ya es un array
      } catch (error) {
        console.error("Error al cargar favoritos", error);
        setFavoritos([]);
      }
    };

    loadFavoritos();
  }, []);

  // Toggle global reutilizable
  const toggleFavorito = async (postulacionId) => {
    setLoading(true);
    try {
      const isFavorito = favoritos.some(f => f._id === postulacionId);

      console.log('🔄 Toggle favorito:', postulacionId, 'isFavorito:', isFavorito);

      // ✅ Recibir la respuesta: { message, favoritos }
      const result = await toggleFavoritoHandler(isFavorito, postulacionId);

      console.log('✅ Resultado:', result);

      // ✅ Actualizar con el array que devuelve el backend
      if (result.favoritos) {
        setFavoritos(result.favoritos);
        console.log('✅ Favoritos actualizados:', result.favoritos.length);
      }
      
    } catch (error) {
      console.error("❌ Error al actualizar favorito", error);
      alert("Error al actualizar favoritos. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return { favoritos, loading, toggleFavorito };
}