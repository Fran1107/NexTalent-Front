// components/FormLoginCard.jsx
import { useState } from "react";
import { FormField, MailIcon, LockIcon } from "../register/FormField";

export default function FormLoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log('Login:', formData);
  };

  return (
    <div className="items-start">
      <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 h-full flex flex-col justify-between">
        
        {/* Botón de Google */}
        <button className="w-full bg-[url('/img/bgc-google.png')] bg-cover bg-center text-gray-800 font-semibold py-3 px-6 rounded-full flex items-center justify-center gap-3 mb-6 hover:opacity-90 transition border border-blue">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Iniciar sesión con Google 
        </button>

        {/* Divisor */}
        <div className="flex items-center gap-4 my-2">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 font-semibold">O</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            name="password"
            icon={LockIcon}
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            showPasswordToggle={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            required
          />

          {/* Olvidaste contraseña */}
          <div className="text-center">
            <a href="#" className="text-[#4D1874] text-sm hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón Ingresar */}
          <button
            type="submit"
            className="w-full bg-[#4D1874] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#3b115a] transition"
          >
            Ingresar
          </button>

          {/* Registro */}
          <div className="text-center">
            <span className="text-gray-600">¿No tenés cuenta? </span>
            <a href="#" className="text-[#4D1874] font-semibold hover:underline">
              Registrate
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}