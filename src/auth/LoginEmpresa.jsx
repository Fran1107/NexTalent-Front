import FormLoginCard from "../components/login/FormLoginCard";
import RightLoginCard from "../components/login/RightLoginCard";
import SocialSection from "../components/social/SocialSection";

export default function LoginEmpresa() {
    
    return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header con "Cuenta de empresa" */}
        <div className="text-right mb-8">
          <span className="text-lg font-semibold text-gray-800">Cuenta personal</span>
        </div>

        {/* Título principal */}
        <h1 className="text-5xl font-bold text-center mb-12">Ingresa a tu cuenta de empresa</h1>

        {/* Contenedor principal con dos columnas */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Columna izquierda - Formulario */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-6">Encontrá el perfil que buscás</h2>
                {/* Formulario de registro  */}
                <FormLoginCard />
                {/* Redes sociales */}
                <SocialSection />
            </div>
                {/* Card de la derecha con imagen y descripción */}
                <RightLoginCard image="/img/imagen-ingreso-empresas.jpg" />            
          </div>
        </div>
    </div>
    )
}