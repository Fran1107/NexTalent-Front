export default function FavoritoHeroBanner({ image }) {
  return (
    <section
      className="w-full h-[20vh] bg-cover bg-center  shadow-lg overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Mensaje en el hero banner */}
      <div className="w-full h-full bg-black/50 flex justify-start items-center text-right px-6 sm:px-12">
        <div className="text-white max-w-lg">
          <h2 className="text-3xl sm:text-3xl font-semi-bold mb-2">
            Pasantías guardadas
          </h2>
        </div>
      </div>
    </section>

  )
}
