import FormLoginCard from "../components/login/FormLoginCard";
import RightLoginCard from "../components/login/RightLoginCard";
import SocialSection from "../components/social/SocialSection";

export default function LoginEmpresa() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        
        {/* Título principal */}
        <h1 className="text-5xl font-bold text-center mb-12">
          Inicio de sesión
        </h1>

        {/* Contenedor principal con dos columnas del mismo alto */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card izquierda - Formulario */}
          <div className="h-full flex flex-col justify-between bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-6">
              Ingresá a tu cuenta personal
            </h2>

            {/* Formulario de ingreso */}
            <div className="flex-1">
              <FormLoginCard />
            </div>

            {/* Redes sociales */}
            <div className="mt-6">
              <SocialSection />
            </div>
          </div>

          {/* Card derecha - Imagen y descripción */}
          <RightLoginCard image="/img/chica-sentada.gif" />
        </div>
      </div>
    </div>
  );
}
