import { getFavoritos, addFavorito, removeFavorito } from "../API/pasanteApi";

export const fetchFavoritosHandler = async () => {
  return await getFavoritos();
};

export const toggleFavoritoHandler = async (isFavorito, postulacionId) => {
  if (isFavorito) {
    // ✅ Devolver la respuesta completa del backend
    const response = await removeFavorito(postulacionId);
    return response; // { message: "...", favoritos: [...] }
  } else {
    // ✅ Devolver la respuesta completa del backend
    const response = await addFavorito(postulacionId);
    return response; // { message: "...", favoritos: [...] }
  }
};