//import React from "react";

const Valores = () => {
  const valores = [
    {
      titulo: "Compromiso",
      texto:
        "trabajamos con responsabilidad para brindar un servicio que genere impacto positivo en la vida de los usuarios.",
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
    <section className="bg-[#F7F4FA] py-9 px-4 flex flex-col items-center font-bold">
      <div className="max-w-3xl w-full space-y-6">
        {valores.map((valor, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#4D1874] to-[#8E2DE2] p-[2px] rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
          >
            <div className="bg-white rounded-2xl px-6 py-4 text-gray-800 text-center">
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

