// ---------------------------------------------------------------
//  Componente: RegisterFromEmpresaView
//  Descripción: Formulario de registro con validación y manejo de estado
// ---------------------------------------------------------------

import { useState } from "react";
import CustomDropdown from "../components/CustomDropdown";
import { FormField, UserIcon } from "../components/register/FormField";
import SocialSection from "../components/social/SocialSection";

export default function RegisterFromEmpresaView () {

    // Controla como se muestra la contraseña

    const [showPassword, setShowPassword] = useState(false)

    // Confirmación de contraseña

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Estado del formulario

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        phone:"",
        confirmPassword:"",
        position:"",
    })

    // Estado de errores
    const [errors, setErrors] = useState({})

    // Manejador de cambios en el formulario

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }))

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    // Validaciones
    const validate = () => {
        const newErrors = {}

        // Validaciones básicas de presencia
        if (!formData.firstName) newErrors.firstName = "El nombre es requerido"
        if (!formData.lastName) newErrors.lastName = "El apellido es requerido"

        // Validación de email
        if(!formData.email) {
            newErrors.email = "El correo electrónico es requerido"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Correo electrónico inválido"
        }

        // Validación de contraseña
        if (!formData.password) {
            newErrors.password = "La contraseña es requerida"
        } else if (formData.password.length < 8) {
            newErrors.password = "La contraseña debe tener al menos 8 caracteres"
        }

        // Validación para comparar contraseñas
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden"
        }

        // completar-----------------------------
    }

    // Botón de enviar formulario

    const handleSubmit = (e) => {
        e.preventDefault()
        const newErrors = validate()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
    }

    // Use state de rubros
    const [rubro, setRubro] = useState('');
  
    const rubros = ['Desarrollo de Software', 'Front-End', 'UX-UI', 'Back-End', 'Ingeniería de Datos', 'Arquitectura de Datos', 'Inteligencia Artifical/Machine Learning', 'Ciberseguridad', 'DevOps', 'Cloud Computing', 'Infraestructura y Redes', 'IoT/Internet de las Cosas', 'Soporte Técnico', 'Otro'];

    // Use state de la condición fiscal

    const [fiscal, setFiscal] = useState('')

    const condFiscal = ['Exento', 'Monotributo', 'Responsable Inscripto']

    // Use state de las provincias

    const [provincia, setProvincia] = useState('')

    const provincias = ["Buenos Aires", "Catamarca", "Chaco", "Chubut",  "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago el Estero", "Tierra del Fuego", "Tucumán"]

    // Modalidad de trabajo

    const [modalidad, setModalidad] = useState('')

    const modalidades = ['Presencial', 'Híbrido', 'Remoto']

    // Cantidad de empleados

    const [cantidad, setCantidad] = useState('')

    const cantidades = ['Entre 1 y 10', 'Entre 11 y 50', 'Entre 51 y 150', 'Entre 151 y 300', 'Entre 301 y 500', 'Entre 301 y 500', 'Entre 501 y 1000', 'Más de 1000', ]


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
                        <label htmlFor="empresa" className="block font-medium text-gray-800 mb-2">
                            <span className="text-red-500 mr-1">*</span>
                            Nombre de la empresa
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"/>
                            <input id="empresa" type="text" className="w-full pl-12 pr-4 py-3 bg-[#F3F1F1]  rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                        </div>
                    </div>
                </div>

                {/* Razón social */}
                <div className="gap-4">
                    <div>
                        <label htmlFor="razonSocial" className="block  font-medium text-gray-700 mb-2">
                            <span className="text-red-500 mr-1">*</span>
                            Razón social
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"/>
                            <input id="razonSocial" type="text" className="w-full pl-12 pr-4 py-3 bg-[#F3F1F1] rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                        </div>
                    </div>
                </div>

                {/* Condición fiscal */}
                <div className="gap-4">
                    <div>
                        <CustomDropdown 
                        label="Condición Fiscal"
                        options={condFiscal}
                        required={true}
                        value={fiscal}
                        onChange={setFiscal}
                        />
                    </div>
                </div>

                {/* Rubro IT */}
                <div className="gap-4">
                    <div>
                        <CustomDropdown
                        label="Rubro IT"
                        options={rubros}
                        required={true}
                        value={rubro}
                        onChange={setRubro}
                        />
                    </div>
                </div>

                {/* Provincia */}
                <div className="gap-4">
                    <div>
                        <CustomDropdown
                        label="Provincia"
                        options={provincias}
                        required={true}
                        value={provincia}
                        onChange={setProvincia}
                        />
                    </div>
                </div>

                {/* Localidad */}
                <div className="gap-4">
                    <div>
                        <label htmlFor="localidad" className="block font-medium text-gray-800 mb-2">
                            <span className="text-red-500 mr-1">*</span>
                            Localidad
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"/>
                            <input id="localidad" type="text" className="w-full pl-12 pr-4 py-3 bg-[#F3F1F1]  rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                        </div>
                    </div>
                </div>

                {/* Número de calle de la empresa */}
                <div className="gap-4">
                    <div>
                        <label htmlFor="numeroCalle" className="block font-medium text-gray-800 mb-2">
                            <span className="text-red-500 mr-1">*</span>
                            Número
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"/>
                            <input id="numeroCalle" type="number" className="w-full pl-12 pr-4 py-3 bg-[#F3F1F1]  rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                        </div>
                    </div>
                </div>

                {/* Calle de la empresa */}
                <div className="gap-4">
                    <div>
                        <label htmlFor="calle" className="block font-medium text-gray-800 mb-2">
                            <span className="text-red-500 mr-1">*</span>
                            Calle
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"/>
                            <input id="calle" type="text" className="w-full pl-12 pr-4 py-3 bg-[#F3F1F1]  rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                        </div>
                    </div>
                </div>

                {/* Código postal */}
                <div className="gap-4">
                    <div>
                        <label htmlFor="codigoPostal" className="block font-medium text-gray-800 mb-2">
                            <span className="text-red-500 mr-1">*</span>
                            Código Postal
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"/>
                            <input id="codigoPostal" type="number" className="w-full pl-12 pr-4 py-3 bg-[#F3F1F1]  rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                        </div>
                    </div>
                </div>

                {/* Modalidad de trabajo */}
                <div className="gap-4">
                    <div>
                        <CustomDropdown
                        label="Modalidad de trabajo"
                        options={modalidades}
                        required={true}
                        value={modalidad}
                        onChange={setModalidad}
                        />
                    </div>
                </div>

                {/* Correo electrónico de la empresa */}
                <div className="gap-4">
                    <div>
                        <label htmlFor="emailEmpresa" className="block font-medium text-gray-800 mb-2">
                            <span className="text-red-500 mr-1">*</span>
                            Correo electrónico de la empresa
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"/>
                            <input id="emailEmpresa" type="email" className="w-full pl-12 pr-4 py-3 bg-[#F3F1F1]  rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                        </div>
                    </div>
                </div>

                {/* Descripción de la empresa */}
                <div className="gap-4">
                    <div>
                        <label htmlFor="descEmpresa" className="block font-medium text-gray-800 mb-2">
                            <span className="text-red-500 mr-1">*</span>
                            Descripción de la empresa
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"/>
                            <input id="descEmpresa" type="text" className="w-full pl-12 pr-4 py-3 bg-[#F3F1F1]  rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                        </div>
                    </div>
                </div>

                {/* Logo de la empresa */}
                <div className="gap-4">
                    <div>
                        <label htmlFor="empresa" className="block font-medium text-gray-800 mb-2">
                            Logo
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"/>
                            <input id="empresa" type="file" className="w-full pl-12 pr-4 py-3 bg-[#F3F1F1]  rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-500"/>
                        </div>
                    </div>
                </div>

                {/* Sitio web */}
                <div className="gap-4">
                    <div>
                        <label htmlFor="sitioWeb" className="block font-medium text-gray-800 mb-2">
                            Sitio web
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"/>
                            <input id="sitioWeb" type="text" className="w-full pl-12 pr-4 py-3 bg-[#F3F1F1]  rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-500" placeholder="URL"/>
                        </div>
                    </div>
                </div>

                {/* Cantidad de empleados */}
                <div className="gap-4">
                    <div>
                        <CustomDropdown
                        label="Cantidad de empleados"
                        options={cantidades}
                        required={true}
                        value={cantidad}
                        onChange={setCantidad}
                        />
                    </div>
                </div>

            </form>
            
            <h2 className="text-2xl font-semibold text-center m-10">Información de usuario</h2>

            {/* Formulario de creación de cuenta */}

            <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Nombre de usuario */}
                    <FormField 
                        label="Nombre(s)"
                        type="text"
                        name="firstName"
                        icon={UserIcon}
                        value={FormData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        required
                    />  

                    {/* Apellido de usuario */}
                    <FormField 
                        label="Apellido(s)"
                        type="text"
                        name="lastName"
                        icon={UserIcon}
                        value={FormData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        required
                    />  


                </div>

                {/* Botón de envío de formulario */}
                <button type="submit" className="w-full bg-[#4D1874] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#3b115a] transition"
                >
                    Crear cuenta
                </button>

                {/* Sección de redes sociales */}
                <SocialSection />

            </form>


        </div>
        </>
    )
}