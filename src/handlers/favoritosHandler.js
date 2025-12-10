import { getFavoritos, addFavorito, removeFavorito } from "../API/pasanteApi";

// Obtener favoritos desde el backend
export const fetchFavoritosHandler = async () => {
  return await getFavoritos(); // Devuelve directamente el array
};

export const toggleFavoritoHandler = async (isFavorito, postulacionId) => {
  // ✅ Más conciso: devolver directamente la promesa
  return isFavorito 
    ? await removeFavorito(postulacionId)
    : await addFavorito(postulacionId);
};