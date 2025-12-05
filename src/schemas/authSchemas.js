
import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'La contraseña es requerida'),
    // userType lo manejamos internamente en cada componente, no necesitamos que el usuario lo ingrese
});