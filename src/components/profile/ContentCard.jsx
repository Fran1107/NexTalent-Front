// import ImageCardContent from "./ImageCardContent";

export default function ContentCard({ 
    h3="", 
    p=""
}) {
    return (
        // Contenido textual de las pasantías guardadas en favoritos
        <>
            {/* <ImageCardContent image="/img/" /> */}
            <div className="text-black text-center">
                {h3 && (
                    <h3 className="text-xl sm:text-2xl md:text-2xl font-semibold">
                        {h3}
                    </h3>
                )}
                {p && (
                    <p className="text-xl sm:text-1xl md:text-1xl font-medium text-left">
                        {p}
                    </p>
                )}
            </div>
        </>
    )
}