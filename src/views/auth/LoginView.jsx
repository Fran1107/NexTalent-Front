import { useState } from 'react';
import LoginPasante from './LoginPasante';
import LoginEmpresa from './LoginEmpresa';

export default function LoginView() {
  const [userType, setUserType] = useState('pasante');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        
        {/* Switcher de Tipo de Usuario */}
        <div className="flex w-full mb-6 bg-white rounded-full p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setUserType('pasante')}
            className={`flex-1 py-3 text-center rounded-full font-bold transition-all duration-300 ${
              userType === 'pasante'
                ? 'bg-[#4D1874] text-white shadow-md'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Soy Pasante
          </button>
          <button
            onClick={() => setUserType('empresa')}
            className={`flex-1 py-3 text-center rounded-full font-bold transition-all duration-300 ${
              userType === 'empresa'
                ? 'bg-[#4D1874] text-white shadow-md'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Soy Empresa
          </button>
        </div>

        {/* Renderizado condicional del formulario */}
        <div className="transition-opacity duration-300 ease-in-out">
          {userType === 'pasante' ? <LoginPasante /> : <LoginEmpresa />}
        </div>

      </div>
    </div>
  );
}