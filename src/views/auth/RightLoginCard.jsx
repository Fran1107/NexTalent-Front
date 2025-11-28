export default function RightLoginCard({ image, titleLine1, titleLine2 }) {
  return (
    // CONTENEDOR PRINCIPAL: Color de fondo base VIOLETA OSCURO (#4D1874)
    // Esto asegura que la parte inferior sea del color correcto para el texto.
    <div className="hidden md:flex w-1/2 relative overflow-hidden flex-col bg-[#4D1874] rounded-r-3xl">

      {/* CAPA 1: La banda LILA intermedia */}
      {/* Es un óvalo gigante que baja hasta el 75% de la altura */}
      <div className="absolute top-0 left-[-30%] w-[190%] h-[75%] bg-[#bd80d8] rounded-b-[100%]"></div>

      {/* CAPA 2: El fondo BLANCO superior */}
      {/* Es otro óvalo gigante superpuesto, un poco más corto (72%), 
          lo que deja ver la "banda" lila de la capa anterior */}
      <div className="absolute top-0 left-[-20%] w-[160%] h-[70%] bg-white rounded-b-[100%]"></div>

      {/* CONTENIDO (Z-INDEX 10 para estar sobre las capas) */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">

        {/* 1. SECCIÓN IMAGEN (Ubicada en la zona blanca) */}
        <div className="h-[75%] w-full flex items-center justify-center pt-8">
          <div className="w-64 h-64 lg:w-80 lg:h-80 relative">
            <img
              src={image}
              alt="Ilustración"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 2. SECCIÓN TEXTO (Ubicada en la zona violeta oscura) */}
        {/* flex-1 hace que ocupe el espacio restante abajo */}
        <div className="flex-1 flex flex-col justify-start pt-4 items-center text-center px-8 text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-1 tracking-wide">
            {titleLine1}
          </h2>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-wide">
            {titleLine2}
          </h2>
        </div>

      </div>
    </div>
  );
}