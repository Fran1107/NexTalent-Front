// ---------------------------------------------------------------
//  Componente: RegisterFromEmpresaView
//  Descripción: Formulario de registro con validación y manejo de estado
// ---------------------------------------------------------------

import { FormField, UserIcon } from "../components/register/FormField";

export default function RegisterFromEmpresaView () {

    return (
        <>
        {/* Titulo de página de registro para empresas */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
            <h1 className="text-3xl font-bold text-center mb-12">
                Ingresá los datos de tu empresa
            </h1>

            {/* Formulario */}
            <form className="space-y-5 grid md:grid-cols-2 gap-4"  /* onSubmit={handleSubmit} */ >

                {/* Nombre de la empresa */}
                <div className="gap-4">
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre de la empresa
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"/>
                            <input id="company" type="text" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                        </div>
                    </div>
                </div>

                {/* Razón social */}
                <div className="gap-4">
                    <div>
                        <label htmlFor="razon-social" className="block text-sm font-medium text-gray-700 mb-2">
                            Razón social
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"/>
                            <input id="razon-social" type="text" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                        </div>
                    </div>
                </div>

                {/* Condición fiscal */}
                <div className="gap-4">
                    <div>
                        <label htmlFor="condicion-fiscal" className="block text-sm font-medium text-gray-700 mb-2">
                            Condición fiscal
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"/>
                            <input id="condicion-fiscal" type="text" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                        </div>
                    </div>
                </div>

                {/* Rubro/sector */}
                <div className="gap-4">
                    <div>
                        <label htmlFor="rubro" className="block text-sm font-medium text-gray-700 mb-2">
                            Rubro/Sector
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"/>
                            <input id="rubro" type="text" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                        </div>
                    </div>
                </div>

                {/* Nombre y apellido (grid de 2 columnas) */}
                {/* <div className="grid md:grid-cols-2 gap-4">
                    <FormField 
                    
                    

                    />
                </div> */}
            </form>


        </div>
        </>
    )
}