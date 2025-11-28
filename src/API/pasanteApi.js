import api from '../lib/axios';
import { isAxiosError } from 'axios';

// Obtener todos los pasantes 
export async function getAllPasantes(params = {}) {
    try {
        const { data } = await api.get('/pasantes', { params });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

// Obtener pasante por ID (Público)
export async function getPasanteById(id) {
    try {
        const { data } = await api.get(`/pasantes/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

// Obtener mi perfil (Requiere autenticación)
export async function getMyPasanteProfile() {
    try {
        const { data } = await api.get('/pasantes/profile/me');
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

// Actualizar mi perfil (Requiere autenticación)
export async function updateMyPasanteProfile(formData) {
    try {
        const { data } = await api.put('/pasantes/profile/me', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

// Eliminar mi cuenta (Requiere autenticación)
export async function deleteMyPasanteAccount() {
    try {
        const { data } = await api.delete('/pasantes/profile/me');
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}