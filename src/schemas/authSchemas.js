import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'La contraseña es requerida'),
});

// --- Esquema de Registro PASANTE ---
export const registerPasanteSchema = z.object({
    nombre: z.string().min(2, "El nombre es muy corto"),
    apellido: z.string().min(2, "El apellido es muy corto"),
    carrera: z.string().min(3, "Ingresa tu carrera"),
    telefono: z.string().min(6, "Teléfono inválido").optional().or(z.literal('')),
    email: z.string().email().optional().or(z.literal('')),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    provincia: z.string().optional(),
    localidad: z.string().optional(),
    fechaNacimiento: z.string().optional() 
});

// --- Esquema de Registro EMPRESA  ---
export const registerEmpresaSchema = z.object({
    nombre: z.string().min(2, "El nombre comercial es obligatorio"),
    razonSocial: z.string().min(2, "La razón social es obligatoria"),
    sector: z.string().min(2, "El sector es obligatorio"),
    email: z.string().email().optional().or(z.literal('')),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    telefono: z.string().optional(),
    provincia: z.string().optional(),
    localidad: z.string().optional(),
    calle: z.string().optional(),
    numero: z.string().optional(),
    codigoPostal: z.string().optional(),
    modalidadTrabajo: z.string().optional(),
    cantidadEmpleados: z.string().optional(),
    descripcion: z.string().optional(),
    sitioWeb: z.string().optional()
});