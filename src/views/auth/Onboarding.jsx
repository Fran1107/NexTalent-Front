import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { User, Building2 } from 'lucide-react';
import { getCurrentUser, completeGoogleOnboarding } from '../../API/AuthAPI';
import { registerPasanteSchema, registerEmpresaSchema } from '../../schemas/authSchemas';

export default function Onboarding() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState(null);
    const [userData, setUserData] = useState(null);
    const [serverError, setServerError] = useState('');

    // 1. Al cargar, verificamos quién es el usuario de Google
    useEffect(() => {
        const checkUser = async () => {
            try {
                const data = await getCurrentUser();
                if (!data) return navigate('/login');

                // Si el backend dice que ya tiene perfil completo, lo sacamos de acá
                if (data.user.isProfileComplete) {
                    return navigate(data.user.userType === 'empresa' ? '/' : '/');
                }
                setUserData(data.user);
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };
        checkUser();
    }, [navigate]);

    // 2. Configuración del Formulario
    const schema = role === 'pasante' ? registerPasanteSchema : registerEmpresaSchema;

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema),
    });

    // 3. Manejo del Submit
    const onSubmit = async (formData) => {
        try {
            setServerError('');
            // Preparamos los datos para enviar al backend
            const payload = {
                ...formData,
                userType: role,
                email: userData.email,
            };

            await completeGoogleOnboarding(payload);

            // Redirección final
            if (role === 'pasante') {
                window.location.href = '/';
            } else {
                window.location.href = '/';
            }

        } catch (error) {
            setServerError(error.message || 'Error al guardar el perfil');
        }
    };
    // VISTA 1: ELEGIR ROL
    if (step === 1) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-[#4D1874] mb-2">
                        ¡Bienvenido, {userData?.email?.split('@')[0]}!
                    </h1>
                    <p className="text-gray-600 text-lg">Para continuar, selecciona tu perfil.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
                    <button
                        onClick={() => { setRole('pasante'); setStep(2); }}
                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#4D1874] text-left group"
                    >
                        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <User size={32} className="text-[#4D1874]" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Soy Estudiante</h3>
                        <p className="text-gray-500">Busco pasantías.</p>
                    </button>

                    <button
                        onClick={() => { setRole('empresa'); setStep(2); }}
                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#4D1874] text-left group"
                    >
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Building2 size={32} className="text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Soy Empresa</h3>
                        <p className="text-gray-500">Busco talento.</p>
                    </button>
                </div>
            </div>
        );
    }

    // VISTA 2: FORMULARIO DE DATOS
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-8">
                <button onClick={() => setStep(1)} className="text-gray-400 mb-6 hover:text-[#4D1874]">
                    ← Volver atrás
                </button>

                <h2 className="text-2xl font-bold mb-6 text-[#4D1874]">
                    Completa tus datos de {role === 'pasante' ? 'Estudiante' : 'Empresa'}
                </h2>

                {serverError && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center">{serverError}</div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* ====SECCIÓN PASANTE (Estudiantes)==== */}
                    {role === 'pasante' && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                    <input {...register('nombre')} className="w-full bg-gray-100 rounded-lg p-3" placeholder="Tu nombre" />
                                    {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                                    <input {...register('apellido')} className="w-full bg-gray-100 rounded-lg p-3" placeholder="Tu apellido" />
                                    {errors.apellido && <p className="text-red-500 text-xs">{errors.apellido.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Carrera</label>
                                <input {...register('carrera')} className="w-full bg-gray-100 rounded-lg p-3" placeholder="Ej: Ingeniería en Sistemas" />
                                {errors.carrera && <p className="text-red-500 text-xs">{errors.carrera.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <input {...register('telefono')} className="w-full bg-gray-100 rounded-lg p-3" placeholder="Ej: 387..." />
                                {errors.telefono && <p className="text-red-500 text-xs">{errors.telefono.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                                    <input {...register('provincia')} className="w-full bg-gray-100 rounded-lg p-3" />
                                    {errors.provincia && <p className="text-red-500 text-xs">{errors.provincia.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Localidad</label>
                                    <input {...register('localidad')} className="w-full bg-gray-100 rounded-lg p-3" />
                                    {errors.localidad && <p className="text-red-500 text-xs">{errors.localidad.message}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                                <input type="date" {...register('fechaNacimiento')} className="w-full bg-gray-100 rounded-lg p-3" />
                                {errors.fechaNacimiento && <p className="text-red-500 text-xs">{errors.fechaNacimiento.message}</p>}
                            </div>
                        </>
                    )}

                    {/* ====SECCIÓN EMPRESA (Reclutadores)==== */}
                    {role === "empresa" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-700 mb-1">
                                        Nombre Comercial
                                    </label>
                                    <input
                                        {...register("nombre")}
                                        placeholder="Nombre visible"
                                        className="w-full bg-gray-100 rounded-xl p-3 text-gray-800 placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                                    />
                                    {errors.nombre && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.nombre.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-700 mb-1">
                                        Razón Social
                                    </label>
                                    <input
                                        {...register("razonSocial")}
                                        placeholder="Nombre legal"
                                        className="w-full bg-gray-100 rounded-xl p-3 text-gray-800 placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                                    />
                                    {errors.razonSocial && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.razonSocial.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-700 mb-1">
                                        Sector
                                    </label>
                                    <input
                                        {...register("sector")}
                                        placeholder="Ej: Tecnología"
                                        className="w-full bg-gray-100 rounded-xl p-3 text-gray-800 placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                                    />
                                    {errors.sector && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.sector.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-700 mb-1">
                                        Teléfono
                                    </label>
                                    <input
                                        {...register("telefono")}
                                        placeholder="Ej: +54 9 11 1234 5678"
                                        className="w-full bg-gray-100 rounded-xl p-3 text-gray-800 
                    placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                                    />
                                    {errors.telefono && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.telefono.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-1">
                                    Descripción
                                </label>
                                <textarea
                                    {...register("descripcion")}
                                    rows={3}
                                    placeholder="Describí brevemente tu empresa..."
                                    className="w-full bg-gray-100 rounded-xl p-3 text-gray-800 placeholder:text-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                                />
                                {errors.descripcion && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.descripcion.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-700 mb-1">
                                        Provincia
                                    </label>
                                    <input
                                        {...register("provincia")}
                                        placeholder="Ej: Buenos Aires"
                                        className="w-full bg-gray-100 rounded-xl p-3 text-gray-800 placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-700 mb-1">
                                        Localidad
                                    </label>
                                    <input
                                        {...register("localidad")}
                                        placeholder="Ej: La Plata"
                                        className="w-full bg-gray-100 rounded-xl p-3 text-gray-800 placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="flex flex-col sm:col-span-2">
                                    <label className="text-sm font-semibold text-gray-700 mb-1">
                                        Calle
                                    </label>
                                    <input
                                        {...register("calle")}
                                        placeholder="Ej: Av. Siempreviva"
                                        className="w-full bg-gray-100 rounded-xl p-3 text-gray-800 placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-700 mb-1">
                                        Número
                                    </label>
                                    <input
                                        {...register("numero")}
                                        placeholder="Ej: 742"
                                        className="w-full bg-gray-100 rounded-xl p-3 text-gray-800 placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-1">
                                    Código Postal
                                </label>
                                <input
                                    {...register("codigoPostal")}
                                    placeholder="Ej: 1900"
                                    className="w-full bg-gray-100 rounded-xl p-3 text-gray-800 placeholder:text-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-700 mb-1">
                                        Modalidad
                                    </label>
                                    <select
                                        {...register("modalidadTrabajo")}
                                        className="w-full bg-gray-100 rounded-xl p-3 text-gray-800 
                    focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                                    >
                                        <option value="">Seleccionar...</option>
                                        <option value="Presencial">Presencial</option>
                                        <option value="Remoto">Remoto</option>
                                        <option value="Hibrido">Híbrido</option>
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-700 mb-1">
                                        Empleados
                                    </label>
                                    <select
                                        {...register("cantidadEmpleados")}
                                        className="w-full bg-gray-100 rounded-xl p-3 text-gray-800 
                    focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                                    >
                                        <option value="">Seleccionar...</option>
                                        <option value="1-10">1-10</option>
                                        <option value="11-50">11-50</option>
                                        <option value="51-200">51-200</option>
                                        <option value="201-500">201-500</option>
                                        <option value="500+">500+</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CAMPOS OCULTOS */}
                    <input type="hidden" {...register('password')} value="GoogleAuth123!" />
                    <input type="hidden" {...register('confirmPassword')} value="GoogleAuth123!" />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#4D1874] text-white rounded-full py-3 font-bold hover:bg-[#3a1259] transition mt-6"
                    >
                        {isSubmitting ? 'Guardando...' : 'Finalizar Registro'}
                    </button>
                </form>
            </div>
        </div>
    );
}