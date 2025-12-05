import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerEmpresa } from '../../API/AuthAPI';

const RegisterEmpresaForm = () => {
    // Inicializamos useForm
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            if (data.password !== data.confirmPassword) {
                alert("Las contraseñas no coinciden");
                return;
            }

            // Preparamos los datos, quitando confirmPassword
            const { confirmPassword, ...dataToSend } = data;

            console.log("Enviando datos empresa...", dataToSend);
            await registerEmpresa(dataToSend);

            alert("¡Cuenta de empresa creada exitosamente!");
            navigate('/auth/login');

        } catch (error) {
            console.error(error);
            alert(error.message || "Error al registrar empresa");
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">

                {/* Identidad de la Empresa */}
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Nombre comercial de la empresa *</label>
                    <input type="text" {...register("nombre", { required: "El nombre es obligatorio" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                    {errors.nombre && <span className="text-red-500 text-xs">{errors.nombre.message}</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Razón Social *</label>
                    <input type="text" {...register("razonSocial", { required: "Razón Social obligatoria" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Rubro / Sector *</label>
                    <input type="text" {...register("sector", { required: "Sector obligatorio" })} placeholder="Ej: Tecnología"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm placeholder:text-gray-400" />
                </div>

                {/* Ubicación (Desglosada según el modelo Empresa.js) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Provincia *</label>
                    <input type="text" {...register("provincia", { required: "Provincia obligatoria" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Localidad *</label>
                    <input type="text" {...register("localidad", { required: "Localidad obligatoria" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                </div>

                <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Calle *</label>
                    <input type="text" {...register("calle", { required: "Calle obligatoria" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Número *</label>
                        <input type="text" {...register("numero", { required: "Número obligatorio" })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">C.P. *</label>
                        <input type="text" {...register("codigoPostal", { required: "C.P. obligatorio" })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                    </div>
                </div>

                {/* Modalidad de Trabajo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Modalidad de trabajo *</label>
                    <select {...register("modalidadTrabajo", { required: "Selecciona una modalidad" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                        <option value="">Seleccione...</option>
                        <option value="Remoto">Remoto</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Hibrido">Híbrido</option>
                    </select>
                    {errors.modalidadTrabajo && <span className="text-red-500 text-xs">{errors.modalidadTrabajo.message}</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Cantidad de empleados</label>
                    <select {...register("cantidadEmpleados")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                        <option value="">Seleccione...</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="201-500">201-500</option>
                        <option value="500+">500+</option>
                    </select>
                </div>

                {/* Contacto y Cuenta */}
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Sitio Web</label>
                    <input type="url" {...register("sitioWeb")} placeholder="https://miempresa.com"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm placeholder:text-gray-400" />
                </div>

                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Descripción de la empresa *</label>
                    <textarea rows={3} {...register("descripcion", { 
                        required: "La descripción es obligatoria",
                        maxLength: { value: 2000, message: "Máximo 2000 caracteres" } 
                    })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                    {errors.descripcion && <span className="text-red-500 text-xs">{errors.descripcion.message}</span>}
                </div>

                <div className="sm:col-span-2 border-t pt-4 mt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Datos de la cuenta</h3>
                </div>

                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Correo electrónico empresarial *</label>
                    <input type="email" {...register("email", { required: "Email obligatorio" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono de contacto *</label>
                    <input type="text" {...register("telefono", { required: "Teléfono obligatorio" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                </div>

                <div></div> {/* Espaciador para grid */}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Contraseña *</label>
                    <input type="password" {...register("password", { required: "Contraseña obligatoria", minLength: 6 })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirmar contraseña *</label>
                    <input type="password" {...register("confirmPassword", { 
                        required: "Confirma contraseña",
                        validate: v => v === password || "No coinciden"
                    })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                </div>
            </div>

            <div className="pt-4">
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-900 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    Crear cuenta de Empresa
                </button>
            </div>
        </form>
    );
};

export default RegisterEmpresaForm;