import React from "react";

const Mision = () => {
  const mision = 
    {
      titulo: "Queremos ser más que un portal: aspiramos a ser un punto de encuentro para quienes buscan aprender, crecer y dar sus primeros pasos en la industria tecnológica."
    }
  return (
    <section className="py-30 px-10 flex flex-col md:flex-row items-center justify-end gap-1 font-noto-serif font-bold">
      <div className="max-w-2xl text-center text-[#4D1874] text-4xl md:text-5xl leading-relaxed space-y-10">
    <h2>
        {mision.titulo}
    </h2>
      </div>
      <div className="flex justify-center md:w-1/2">
                        <img
                            src="/img/mision.jpeg"
                            alt="Imagen ilustrativa"
                            className="w-160 h-auto object-cover"
                        />
                  </div>
    </section>
  );
};

export default Mision;
