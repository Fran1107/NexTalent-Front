import React, { useState } from 'react';
import RegisterPasanteForm from './RegisterPasanteForm'; 
import RegisterEmpresaForm from './RegisterEmpresaForm';
import { Link } from 'react-router-dom'; 

const RegisterView = () => {
    const [userType, setUserType] = useState('pasante'); 

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Crea tu cuenta en NexTalent
                </h2>
                <p className="mt-2 text-center text-xl text-gray-600">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/auth/login" className="font-bold text-purple-600 hover:text-purple-400">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                    <div className="flex w-full mb-6 bg-white rounded-full p-1 shadow-sm border border-gray-200">
                        <button
                            onClick={() => setUserType('pasante')}
                            className={`flex-1 py-3 text-center rounded-full font-bold transition-all duration-300 ${userType === 'pasante'
                                    ? 'bg-[#4D1874] text-white shadow-md'
                                    : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            Soy Estudiante / Pasante
                        </button>
                        <button
                            onClick={() => setUserType('empresa')}
                            className={`flex-1 py-3 text-center rounded-full font-bold transition-all duration-300 ${userType === 'empresa'
                                    ? 'bg-[#4D1874] text-white shadow-md'
                                    : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            Soy Empresa / Reclutador
                        </button>
                    </div>

                    <div className="transition-opacity duration-300">
                        {userType === 'pasante' ? <RegisterPasanteForm /> : <RegisterEmpresaForm />}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterView;