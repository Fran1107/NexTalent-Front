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
            {/* Título de la sección */}
            <h1 className="text-2xl font-bold mb-6">Mis favoritos</h1>

            {/* Condicional: mostrar mensaje si no hay favoritos */}
            {favoritos.length === 0 ? (
                <p>No tenés favoritos agregados todavía</p>
            ) : (
                // Iterar sobre los favoritos y renderizar un CardFavorito por cada uno
                favoritos.map(fav => (
                    <div key={fav.id} className="p-2">
                        <CardFavorito 
                            data={{
                                titulo: fav.titulo, // Título de la pasantía
                                empresa: fav.empresa, // Nombre de la empresa
                                logoUrl: `${BASE_URL}/${fav.logo}` // URL completa del logo
                            }} 
                        />
                    </div>
                ))
            )}
        </div>
    )
}
