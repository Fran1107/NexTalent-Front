// ---------------------------------------------------------------
//  Componente: FormRegisterCard
//  Descripción: Formulario de registro con validación y manejo de estado
// ---------------------------------------------------------------
import { useState } from "react";
// Componentes reutilizables para cada campo del formulario y sus íconos
import {
  FormField,
  MailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  LocationIcon,
} from "../components/register/FormField";

import SocialSection from "../components/social/SocialSection";
import { NavLink } from "react-router-dom";

export default function FormRegisterView() {
  // ---------- Estados de UI ----------
  // Controla si la contraseña se muestra como texto o como puntos
  const [showPassword, setShowPassword] = useState(false);
  // Igual que el anterior, pero para el campo de confirmación de contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Indica si el usuario aceptó recibir promociones (checkbox)
  const [acceptPromotions, setAcceptPromotions] = useState(false);

  // ---------- Estado del formulario ----------
  // Guarda todos los valores introducidos por el usuario
  const [formData, setFormData] = useState({
    firstName: "",        // Nombre(s)
    lastName: "",         // Apellido(s)
    email: "",            // Correo electrónico
    phone: "",            // Teléfono (celular)
    password: "",         // Contraseña
    confirmPassword: "", // Confirmación de contraseña
    province: "",         // Provincia
    city: "",             // Localidad
    birthDate: "",        // Fecha de nacimiento
    linkedinProfile: "", // URL del perfil de LinkedIn
  });

  // ---------- Estado de errores ----------
  // Almacena los mensajes de error por campo cuando la validación falla
  const [errors, setErrors] = useState({});

  // ---------- Manejador de cambios ----------
  // Se ejecuta cada vez que el usuario escribe en un input
  const handleChange = (e) => {
    const { name, value } = e.target; // name = atributo "name" del input
    // Actualiza solo la propiedad que cambió, manteniendo el resto intacto
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Si había un error asociado a ese campo, lo elimina al corregirlo
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ---------- Función de validación ----------
  // Revisa los datos del formulario y devuelve un objeto con los errores encontrados
  const validate = () => {
    const newErrors = {};

    // Validaciones básicas de presencia
    if (!formData.firstName) newErrors.firstName = "El nombre es requerido";
    if (!formData.lastName) newErrors.lastName = "El apellido es requerido";

    // Email: presencia + formato simple
    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Correo electrónico inválido";
    }

    // Contraseña: presencia + longitud mínima
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    // Confirmar contraseña: igualdad con la original
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    // Campos de ubicación y fecha
    if (!formData.province) newErrors.province = "La provincia es requerida";
    if (!formData.city) newErrors.city = "La localidad es requerida";
    if (!formData.birthDate) newErrors.birthDate = "La fecha de nacimiento es requerida";

    // (Opcional) podrías validar el formato de LinkedIn aquí

    return newErrors; // Si está vacío, la validación pasó
  };

  // ---------- Submit ----------
  // Se ejecuta al presionar el botón "Continuar"
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita recargar la página
    const newErrors = validate(); // Ejecuta la validación
    // Si hay errores, los guardamos en el estado y abortamos el envío
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  };

  // ---------------------------------------------------------------
  //  Renderizado del componente
  // ---------------------------------------------------------------
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
      {/* Título del formulario */}
      <h1 className="text-3xl font-bold text-center mb-12">
        Registrate y encontrá tu pasantía ideal
      </h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ---------- Nombre y Apellido (grid de 2 columnas) ---------- */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="Nombre(s)"
            type="text"
            name="firstName"
            icon={UserIcon}
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />
          <FormField
            label="Apellido(s)"
            type="text"
            name="lastName"
            icon={UserIcon}
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
        </div>

        {/* ---------- Email y Teléfono ---------- */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="Correo electrónico"
            type="email"
            name="email"
            icon={MailIcon}
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <FormField
            label="Teléfono (celular)"
            type="tel"
            name="phone"
            icon={PhoneIcon}
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
        </div>

        {/* ---------- Contraseñas ---------- */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="Contraseña"
            // Cambia el tipo según el estado showPassword
            type={showPassword ? "text" : "password"}
            name="password"
            icon={LockIcon}
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            showPasswordToggle={true} // Muestra el ícono de "ojo"
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            required
          />
          <FormField
            label="Confirmar contraseña"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            icon={LockIcon}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            showPasswordToggle={true}
            showPassword={showConfirmPassword}
            onTogglePassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            required
          />
        </div>

        {/* ---------- Provincia y Localidad ---------- */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="Provincia"
            type="text"
            name="province"
            icon={LocationIcon}
            value={formData.province}
            onChange={handleChange}
            error={errors.province}
            required
          />
          <FormField
            label="Localidad"
            type="text"
            name="city"
            icon={LocationIcon}
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            required
          />
        </div>

        {/* ---------- Fecha de nacimiento y LinkedIn ---------- */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="Fecha de nacimiento"
            type="date"
            name="birthDate"
            icon={CalendarIcon}
            value={formData.birthDate}
            onChange={handleChange}
            error={errors.birthDate}
            required
          />
          <FormField
            label="Perfil de LinkedIn"
            type="url"
            name="linkedinProfile"
            placeholder="https://linkedin.com/in/tu-perfil"
            value={formData.linkedinProfile}
            onChange={handleChange}
            error={errors.linkedinProfile}
          />
        </div>

        {/* ---------- Nota de campos obligatorios ---------- */}
        <p className="text-sm text-gray-600 font-semibold">
          <span className="text-red-500 mr-1">*</span> 
          Campos requeridos
        </p>

        {/* ---------- Checkbox de promociones ---------- */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="promotions"
            checked={acceptPromotions}
            onChange={(e) => setAcceptPromotions(e.target.checked)}
            className="mt-1 rounded border-gray-300 text-[#4D1874] focus:ring-[#4D1874]"
          />
          <label htmlFor="promotions" className="ml-2 text-sm text-gray-500">
            Acepto recibir Novedades y Promociones
          </label>
        </div>

        {/* ---------- Enlace a iniciar sesión ---------- */}
        <div className="text-center">
          <span className="text-gray-600">¿Ya tienes una cuenta? </span>
          <NavLink to="/auth/login" className="text-[#4D1874] font-semibold hover:underline">
            Inicia sesión
          </NavLink>
        </div>

        {/* ---------- Botón de envío ---------- */}
        <button
          type="submit"
          className="w-full bg-[#4D1874] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#3b115a] transition"
        >
          Continuar
        </button>

        {/* ---------- Sección de redes sociales ---------- */}
        <SocialSection />
      </form>
    </div>
  );
}