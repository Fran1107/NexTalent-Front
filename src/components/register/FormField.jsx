// ---------------------------------------------------------------
//  FormField – Componente reutilizable para cada input del login/registro
// ---------------------------------------------------------------
// Recibe todas las props necesarias para describir el campo y opcionalmente mostrar un ícono y un botón de “ver/ocultar contraseña”.

export function FormField({ 
  label,                     // Texto que aparecerá como <label>
  type = 'text',             // Tipo HTML del <input> (text, email, password, …)
  name,                      // atributo name/id del <input> (usado también por label)
  placeholder = '',         // placeholder del <input>
  error,                     // mensaje de error que proviene del padre (si existe)
  required = false,         // si el campo es obligatorio → agrega asterisco
  icon: Icon,                // componente SVG que se mostrará dentro del input
  showPasswordToggle = false, // true solo para password/confirmPassword
  showPassword,               // estado del padre que indica si se muestra texto
  onTogglePassword,           // callback del padre para cambiar showPassword
  ...props                    // cualquier otra prop (e.g. value, onChange, etc.)
}) 
{
  return (
    <div>
      {/* ---------- LABEL ---------- */}
      {/* Si se pasa un label, lo renderizamos asociado al input mediante htmlFor */}
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {/* Asterisco rojo para campos obligatorios */}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* ---------- INPUT CON ICONO Y TOGGLE ---------- */}
      <div className="relative">
        {/* Ícono a la izquierda (si se envió una prop icon) */}
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {/* El componente SVG recibe la clase para tamaño/color */}
            <Icon className="w-5 h-5 text-[#4D1874]" />
          </div>
        )}

        {/* INPUT real */}
        <input
          id={name}
          name={name}
          type={type}                     // “text”, “email”, “password”, etc.
          placeholder={placeholder}
          // Clases Tailwind que:
          // • ajustan padding según exista ícono o toggle
          // • añaden estilos de foco y borde de error
          className={`
            w-full 
            ${Icon ? 'pl-12' : 'pl-4'}          // espacio para el ícono
            ${showPasswordToggle ? 'pr-12' : 'pr-4'} // espacio para el ojo
            py-3 
            bg-[#F3F1F1] rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
          {...props}                       // permite pasar value, onChange, etc.
        />

        {/* Botón “ojo” para alternar visibilidad de la contraseña */}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}    // llama al callback del padre
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {/* Si la contraseña está visible, mostramos el ícono de “ocultar”,
                de lo contrario el ícono de “mostrar”. */}
            {showPassword ? (
              // Ícono “ojo tachado” → indica que al pulsar se ocultará
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              // Ícono “ojo” → indica que al pulsar se mostrará
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* ---------- MENSAJE DE ERROR ---------- */}
      {/* Si el padre envía un mensaje de error, lo mostramos bajo el input */}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------
//  Iconos SVG reutilizables – Cada uno recibe solo la clase CSS
// ---------------------------------------------------------------

// Mail (correo electrónico)
export const MailIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// Candado (password)
export const LockIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

// Usuario (nombre/apellido)
export const UserIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// Teléfono (campo de contacto)
export const PhoneIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

// Calendario (fecha de nacimiento)
export const CalendarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Ubicación (provincia / localidad)
export const LocationIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);