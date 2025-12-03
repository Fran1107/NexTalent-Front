import { useEffect, useState } from "react"; 
import CardFavorito from "./CardFavorito";
import { getFavoritos } from "../../API/PasanteAPI";

// Obtener la URL base del backend para construir rutas de imágenes
const BASE_URL = import.meta.env.VITE_API_URL.replace('/api','')

export default function FavoritosGuardados() {

    // Estado local para almacenar los favoritos del pasante
    const [favoritos, setFavoritos] = useState([])

    // useEffect se ejecuta una sola vez al montar el componente
    useEffect(() => {
        // Función asíncrona para obtener los favoritos desde el backend
        const fetchFavoritos = async () => {
            try {
                // Llamada al API
                const data = await getFavoritos()
                // Guardar datos en el estado
                setFavoritos(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchFavoritos() // Ejecutar la función
    }, [])

    // Renderizado del componente
    return (
        <div className="max-w-3xl mx-auto p-6">

          {/* Contenido principal */}
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
                    />
                  ))
                )}
              </div>
            </div>
          </main>

        </div>
    )
}
