import FavoritoHeroBanner from "../../components/profile/FavoritoHeroBanner";
import FavoritosGuardados from "../../components/profile/FavoritosGuardados";
import Ofertas from "../../pages/Ofertas";

export default function FavoritosView() {
    return (
        <>
            <div className="grid grid-cols-1 justify-center">
                <FavoritoHeroBanner image="/img/Hero-banner-favoritos.png" 
                />
            </div>
            <div className="grid grid-cols-2">
                <div className="">
                    <Ofertas />
                </div>                    
                <div className="min-h-screen">
                    <FavoritosGuardados />                
                </div>
            
            </div>


        </>
    )
}