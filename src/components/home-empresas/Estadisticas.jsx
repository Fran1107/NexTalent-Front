export default function Estadisticas({
    h2="",
    p=""
}) {
    return (
        <>
            {/* Sección de texto con números de pasantes, etc */}
            <div className="flex flex-col sm:flex-row items-center justify-center m-2 sm:m-4 text-center">
            {h2 && (
                <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                {h2}
                </h2>
            )}
            {p && (
                <div className="mt-2 sm:mt-0 sm:ml-3">
                <p className="text-white text-base sm:text-lg md:text-xl">
                    {p}
                </p>
                </div>
            )}
            </div>
        </>
    )
}