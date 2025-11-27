import FavoritoHeroBanner from "../../components/profile/FavoritoHeroBanner";
import FavoritosGuardados from "../../components/profile/FavoritosGuardados";

export default function FavoritosView() {
    return (
        <>
            <div className="grid grid-cols-1 justify-center">
                <FavoritoHeroBanner image="/img/Hero-banner-favoritos.png" 
                />
            </div>
            <div className="h-screen">
                <FavoritosGuardados />                
            </div>

        </>
    )
}