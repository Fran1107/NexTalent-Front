import { useEffect, useState } from "react";
import CardFavorito from "./CardFavorito";
import { getFavoritos } from "../../API/PasanteAPI";

// Acceso a los recursos en http://localhost:3000/

const BASE_URL = import.meta.env.VITE_API_URL.replace('/api','')

export default function FavoritosGuardados() {

    const [favoritos, setFavoritos] = useState([])

    useEffect(() => {
        getFavoritos().then(setFavoritos)
    }, [])

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Mis favoritos</h1>
            {favoritos.length === 0 ? (
                <p>No tenés favoritos agregados todavía</p>
            ) : (
                favoritos.map(fav => (
                    <div key={fav.id} className="p-4 bg-white shadow  rounded-xl">
                        <CardFavorito />
                    </div>
                ))
            )
            }
        </div>
    )
}