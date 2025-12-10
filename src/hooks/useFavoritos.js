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
  const toggleFavorito = async (pasantiaId) => {
    setLoading(true);
    try {
      const isFavorito = favoritos.some(f => f._id === pasantiaId);

      const result = await toggleFavoritoHandler(isFavorito, pasantiaId);

      if (result.removed) {
        setFavoritos(prev => prev.filter(f => f._id !== pasantiaId));
      } else {
        setFavoritos(prev => [...prev, result.pasantia]);
      }
    } catch (error) {
      console.error("Error al actualizar favorito", error);
    } finally {
      setLoading(false);
    }
  };

  return { favoritos, loading, toggleFavorito };
}
