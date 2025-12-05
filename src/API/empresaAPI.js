import api from '../lib/axios';
import { isAxiosError } from 'axios';

// Obtener todas las empresas (Público)
export async function getAllEmpresas(params = {}) {
    try {
        const { data } = await api.get('/empresa', { params });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

// Obtener empresa por ID (Público)
export async function getEmpresaById(id) {
    try {
        const { data } = await api.get(`/empresa/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

// Obtener mi perfil de empresa (Requiere autenticación)
export async function getMyEmpresaProfile() {
    try {
        const { data } = await api.get('/empresa/profile/me');
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

// Actualizar perfil de empresa (Requiere autenticación)
export async function updateMyEmpresaProfile(formData) {
    try {
        const { data } = await api.put('/empresa/profile/me', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

// Eliminar cuenta de empresa (Requiere autenticación)
export async function deleteMyEmpresaAccount() {
    try {
        const { data } = await api.delete('/empresa/profile/me');
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}