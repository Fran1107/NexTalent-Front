import { NavLink } from "react-router-dom";

export default function HeroBanner({ image }) {
  return (
    <section
      className="w-full h-[60vh] bg-cover bg-center  shadow-lg overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Mensaje en el hero banner con botón para ingresar a la cuenta */}
      <div className="w-full h-full bg-black/50 flex justify-end items-center text-right px-6 sm:px-12">
        <div className="text-white max-w-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Publicá tus búsquedas de
          </h2>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            talento en un sólo lugar
          </h2>
          {/* Botón de ingresar */}
            <NavLink to="/auth/login-empresas">
              <button
                type="button"
                className="w-[200px] bg-[#4D1874] text-white font-semibold py-3 rounded-full hover:bg-[#3b115a] transition border border-[#BA96D5]"
              >
                Ingresar              
              </button>
          </NavLink>
        </div>
      </div>
    </section>

  )
}
