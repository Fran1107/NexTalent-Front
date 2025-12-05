import api from '../lib/axios';
import { isAxiosError } from 'axios';

// Función test que apunta al endpoint del backend
export async function authTest() {
    try {
        const { data } = await api.get('/auth');
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || 'Error de autenticación');
        }
        throw error;
    }
}

//Inicia sesión de un usuario (Pasante o Empresa).
export async function authenticateUser(formData) {
    try {
        const url = '/auth/login';
        const { data } = await api.post(url, formData, {
            withCredentials: true, 
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || 'Error al iniciar sesión');
        }
        throw error;
    }
}

//Registra un nuevo Pasante.
export async function registerPasante(formData) {
    try {
        const url = '/auth/register/pasante';
        const { data } = await api.post(url, formData, {
            withCredentials: true,
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || 'Error al registrar pasante');
        }
        throw error;
    }
}

//Registra una nueva Empresa.
export async function registerEmpresa(formData) {
    try {
        const url = '/auth/register/empresa';
        const { data } = await api.post(url, formData, {
            withCredentials: true,
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || 'Error al registrar empresa');
        }
        throw error;
    }
}

//Cierra la sesión del usuario.
export async function logoutUser() {
    try {
        const { data } = await api.post('/auth/logout');
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || 'Error al cerrar sesión');
        }
        throw error;
    }
}

//Obtiene la información del usuario actualmente autenticado.
export async function getCurrentUser() {
    try {
        const { data } = await api.get('/auth/getUser', {
            withCredentials: true,
        });
        return data; 
    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
            return null;
        }
        throw error;
    }
}

// Finaliza el registro híbrido (Google) asignando el rol y datos faltantes
export async function completeGoogleOnboarding(formData) {
    try {
        const { data } = await api.put('/auth/google/complete-profile', formData, {
            withCredentials: true,
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || 'Error al completar el perfil');
        }
        throw error;
    }
}