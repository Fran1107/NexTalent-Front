import { ContentCard } from "./ContentCard";
import { ImageCardContent } from "./ImageCardContent";

export default function CardFavorito({ data }) {
    return (
        <div className="bg-white rounded-3xl w-[30vw] min-h-[30vh] flex items-center gap-4 p-4 shadow">
            
            {/* Imagen dinámica */}
            {/* <ImageCardContent image={data.logoUrl} alt={data.empresa} /> */}

            {/* Contenido dinámico */}
            <ContentCard h3={data.titulo} h4={data.empresa} p={data.descripcion} p1={data.estado} p2={data.modalidad}/>
        </div>
    );
}
