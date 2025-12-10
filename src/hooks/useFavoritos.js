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
        setFavoritos(data);
      } catch (error) {
        console.error("Error al cargar favoritos", error);
      }
    };

    loadFavoritos();
  }, []);

  // Toggle global reutilizable
  const toggleFavorito = async (postulacionId) => {
    setLoading(true);
    try {
      const isFavorito = favoritos.some(f => f._id === postulacionId);

      // ✅ Recibir la respuesta completa: { message, favoritos }
      const result = await toggleFavoritoHandler(isFavorito, postulacionId);

      // ✅ Actualizar con el array que devuelve el backend
      if (result.favoritos) {
        setFavoritos(result.favoritos);
      }
      
    } catch (error) {
      console.error("Error al actualizar favorito", error);
      alert("Error al actualizar favoritos. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return { favoritos, loading, toggleFavorito };
}