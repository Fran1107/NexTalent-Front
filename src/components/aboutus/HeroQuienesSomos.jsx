
import React from 'react'

const HeroQuienesSomos = () => {
  const heroquienessomos = {
    titulo: "Sobre Nosotros",
    descripcion:
      "Somos un grupo de jóvenes apasionados por la tecnología y el aprendizaje continuo. Creemos que el sector IT es una de las áreas con mayor potencial de crecimiento y que abrir oportunidades para jóvenes talentos es clave para transformar el futuro."
  }

  return (
    <section className="font-bold">
      <h2 className="text-3xl px-8 py-3">{heroquienessomos.titulo}</h2>
      <DivLoader />
      <div className="relative w-full h-[600px] mt-8 flex items-center justify-start text-white">
        <img
          src="/img/hero.nosotros.jpeg"
          alt="Jóvenes trabajando en tecnología"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#4D1874]/60"></div>
        <div className="relative max-w-2xl px-8 text-left">
          <p className="text-3xl font-bold leading-relaxed">
            {heroquienessomos.descripcion}
          </p>
        </div>
      </div>
    </section>
  )
}

export const DivLoader = () => {
  return (
    <div className="w-[300px] h-[3px] flex overflow-hidden bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(77,24,116,1)_50%,rgba(0,0,0,0)_100%)]">
      <div className="ml-[100px] w-[150px] bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(77,24,116,1)_50%,rgba(0,0,0,0)_100%)]" />
    </div>
  )
}

export default HeroQuienesSomos
