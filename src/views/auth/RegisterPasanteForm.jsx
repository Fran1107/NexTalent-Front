import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerPasante } from '../../API/AuthAPI';

const RegisterPasanteForm = () => {
  // 'register' conecta los inputs, 'handleSubmit' maneja el envío, 'formState' trae los errores.
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  // Observamos la contraseña para validar que coincida con la confirmación
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // Validacion extra de contraseña (aunque se puede hacer en el register)
      if (data.password !== data.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      // Eliminamos confirmPassword antes de enviar al back porque el back no lo espera
      const { confirmPassword, ...dataToSend } = data;

      console.log("Enviando al backend...", dataToSend);
      await registerPasante(dataToSend);
      
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navigate('/auth/login');
      
    } catch (error) {
      console.error(error);
      alert(error.message || "Error al registrarse");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre(s) *</label>
          <input type="text" {...register("nombre", { required: "El nombre es obligatorio" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-50" />
            {errors.nombre && <span className="text-red-500 text-xs">{errors.nombre.message}</span>}
        </div>
        {/* Apellido */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Apellido(s) *</label>
          <input type="text" {...register("apellido", { required: "El apellido es obligatorio" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-50" />
          {errors.apellido && <span className="text-red-500 text-xs">{errors.apellido.message}</span>}
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Correo electrónico *</label>
          <input type="email" {...register("email", { 
              required: "El email es obligatorio",
              pattern: { value: /^\S+@\S+$/i, message: "Email inválido" }
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-50" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>

        {/* Teléfono */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Teléfono (Celular) *</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              AR +54
            </span>
            <input type="text" {...register("telefono", { required: "El teléfono es obligatorio" })}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-md border border-gray-300 focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-50" />
          {errors.telefono && <span className="text-red-500 text-xs">{errors.telefono.message}</span>}
          </div>
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña *</label>
          <input type="password" {...register("password", { 
              required: "Contraseña obligatoria",
              minLength: { value: 6, message: "Mínimo 6 caracteres" }
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-50" />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </div>
        {/* Confirmar Contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirmar contraseña *</label>
          <input type="password" {...register("confirmPassword", { 
              required: "Confirma tu contraseña",
              validate: value => value === password || "Las contraseñas no coinciden"
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-50" />
          {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
        </div>

        {/* Provincia y Localidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Provincia *</label>
          <input type="text" {...register("provincia", { required: "Provincia obligatoria" })} placeholder="Ej: Salta"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-50 placeholder:text-gray-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Localidad *</label>
          <input type="text" {...register("localidad", { required: "Localidad obligatoria" })} placeholder="Ej: Capital"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-50 placeholder:text-gray-400" />
        </div>

        {/* Fecha Nacimiento */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento *</label>
          <input type="date" {...register("fechaNacimiento", { required: "Fecha obligatoria" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-50" />
        </div>
        
        {/* Carrera */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Carrera / Profesión *</label>
          <input type="text" {...register("carrera", { required: "Carrera obligatoria" })} placeholder="Ej: Ing. en Sistemas"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-50 placeholder:text-gray-400" />
        </div>

        {/* LinkedIn */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Perfil de LinkedIn</label>
          <input type="url" {...register("linkedinUrl")} placeholder="https://linkedin.com/in/usuario"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-50 placeholder:text-gray-400" />
        </div>
      </div>

      <div>
        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-900 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
          Continuar
        </button>
      </div>
    </form>
  );
};

export default RegisterPasanteForm;