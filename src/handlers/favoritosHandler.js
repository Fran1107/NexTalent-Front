// src/handlers/favoritosHandler.js
import { getFavoritos, addFavorito, removeFavorito } from "../API/pasanteApi";

export const fetchFavoritosHandler = async () => {
  return await getFavoritos();
};

export const toggleFavoritoHandler = async (isFavorito, pasantiaId) => {
  if (isFavorito) {
    await removeFavorito(pasantiaId);
    return { removed: true };
  } else {
    const nuevaFav = await addFavorito(pasantiaId);
    return { removed: false, pasantia: nuevaFav.pasantia };
  }
};
