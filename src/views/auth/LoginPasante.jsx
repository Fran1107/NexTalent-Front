import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/authSchemas';
import { authenticateUser } from '../../API/AuthAPI';
import { Eye, EyeOff } from 'lucide-react';
import RightLoginCard from './RightLoginCard';

import pasanteImage from '../../assets/img/chica-sentada.gif';

export default function LoginPasante() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (formData) => {
        try {
            setError('');
            // Aquí inyectamos el userType automáticamente
            await authenticateUser({ ...formData, userType: 'pasante' });
            // Redireccionar o guardar estado global aquí
            window.location.href = '/';
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">

            {/* LADO IZQUIERDO - FORMULARIO */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-center mb-8">Inicia sesión</h2>

                <div className="mb-6">
                    <p className="text-center text-gray-600 mb-4">Ingresá a tu cuenta</p>
                    <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full p-3 hover:bg-gray-50 transition font-medium">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
                        Iniciar sesión con Google
                    </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <span className="text-gray-400">o</span>
                    <div className="h-px bg-gray-300 flex-1"></div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm text-center">{error}</div>}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            {...register('email')}
                            type="email"
                            className="w-full bg-gray-100 border-none rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none placeholder:text-gray-400"
                            placeholder="Ingresa tu email"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <div className="relative">
                            <input
                                {...register('password')}
                                type={showPassword ? "text" : "password"}
                                className="w-full bg-gray-100 border-none rounded-lg p-3 pr-10 focus:ring-2 focus:ring-purple-500 outline-none placeholder:text-gray-400"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="text-center">
                        <a href="#" className="text-sm text-purple-700 hover:underline font-medium">¿Olvidaste tu contraseña?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#4D1874] text-white rounded-full py-3 font-bold hover:bg-[#3a1259] transition disabled:opacity-50"
                    >
                        {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">¿No tenés cuenta? <a href="/registro/pasante" className="text-[#4D1874] font-bold hover:underline">Registrate</a></p>
                </div>
            </div>

            {/* LADO DERECHO - VISUAL */}
            <RightLoginCard
                image={pasanteImage}
                titleLine1="¡Te damos la bienvenida a"
                titleLine2="nuestro portal de pasantías!"
            />
        </div>
    );
}