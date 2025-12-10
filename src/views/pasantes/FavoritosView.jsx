import FavoritoHeroBanner from "../../components/profile/FavoritoHeroBanner";
import FavoritosGuardados from "../../components/profile/FavoritosGuardados";
import MiPerfilView from "./MiPerfilView";

export default function FavoritosView() {
    return (
        <>
            <div className="grid grid-cols-1 justify-center">
                <FavoritoHeroBanner image="/img/Hero-banner-favoritos.png" 
                />
            </div>
            <div className="grid grid-cols-2">
                <div className="">
                    <MiPerfilView />
                </div>                    
                <div className="min-h-screen">
                    <FavoritosGuardados />                
                </div>
            
            </div>


        </>
    )
}