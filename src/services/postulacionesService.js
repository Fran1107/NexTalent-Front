export const getPostulaciones = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/postulaciones");
    if (!res.ok) throw new Error("Error al obtener las postulaciones");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
