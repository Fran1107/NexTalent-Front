export default function HeroBanner({ image }) {
  return (
    <section
      className="w-full h-[60vh] bg-cover bg-center  shadow-lg overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    >

      <div className="w-full h-full bg-black/50 flex items-center justify-end">
      <div className="text-white text-end mr-8">
        <h2 className="text-3xl font-bold mb-2">Publicá tus búsquedas de</h2>
        <h2 className="text-3xl font-bold mb-2">talento en un sólo lugar</h2>
        {/* boton de ingresar */}
        <button type="button" className="w-[20vh] bg-[#4D1874] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#3b115a] transition mr-30 border border-[#BA96D5]">Ingresar</button>        
      </div>
      </div>
      {/* Sección de texto con números de pasantes, etc */}
      {/* <div className="bg-[#4D1874] w-full h-[60vh]">
        <h3>+20.000</h3>
        <h3>Empresas registradas</h3>
      </div>       */}
    </section>

  )
}
