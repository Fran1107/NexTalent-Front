import React from "react";

const Valores = () => {
  const valores = [
    {
      titulo: "Compromiso",
      texto:
        "trabajamos con responsabilidad para brindar un servicio que genere un impacto positivo en los usuarios.",
    },
    {
      titulo: "Innovación",
      texto:
        "buscamos soluciones creativas y tecnológicas que faciliten el acceso a oportunidades laborales.",
    },
    {
      titulo: "Transparencia",
      texto:
        "garantizamos información clara y confiable para quienes confían en nuestro portal.",
    },
    {
      titulo: "Crecimiento",
      texto:
        "promovemos el aprendizaje constante como motor del progreso personal y colectivo.",
    },
  ];

  return (
    <section className="bg-[#4D1874] py-20 px-50 font-bold text-2xl">
      <div className="flex overflow-hidden space-x-15">
        {valores.map((valor, index) => (
          <div
            key={index}
            className="shrink-0 w-[280px] bg-linear-to rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
          >
            <div className="bg-white rounded-2xl px-1 py-5 text-gray-800 text-center">
              <p>
                <span className="font-bold text-[#4D1874]">
                  {valor.titulo}:
                </span>{" "}
                {valor.texto}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Valores;

