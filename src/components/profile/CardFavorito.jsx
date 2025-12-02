import { ContentCard } from "./ContentCard";
import { ImageCardContent } from "./ImageCardContent";

export default function CardFavorito({ data }) {
    return (
        <div className="bg-white rounded-3xl w-[30vw] min-h-[10vh] flex items-center gap-4 p-4 shadow">
            
            {/* Imagen dinámica */}
            <ImageCardContent image={data.logoUrl} alt={data.empresa} />

            {/* Contenido dinámico */}
            <ContentCard h3={data.titulo} p={data.empresa} />
        </div>
    );
}
