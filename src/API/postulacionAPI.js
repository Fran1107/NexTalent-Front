import api from '../lib/axios';
import { isAxiosError } from 'axios';

// --- PÚBLICO ---
export async function getAllPostulaciones(params = {}) {
    try {
        const { data } = await api.get('/postulaciones', { params });
        return data; // Retorna { postulaciones: [...] }
    } catch (error) {
        if (isAxiosError(error)) throw error.response.data;
        throw error;
    }
}

export async function getPostulacionById(id) {
    try {
        const { data } = await api.get(`/postulaciones/${id}`);
        return data; // Retorna { postulacion: {...} }
    } catch (error) {
        if (isAxiosError(error)) throw error.response.data;
        throw error;
    }
}

// --- EMPRESA (Protegido) ---
export async function createPostulacion(formData) {
    try {
        const { data } = await api.post('/postulaciones', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) throw error.response.data;
        throw error;
    }
}

export async function getMyPostulacionesEmpresa() {
    try {
        // Esta ruta debe coincidir con la que definiste en postulacionRoutes.js
        const { data } = await api.get('/postulaciones/dashboard/mis-ofertas');
        return data;
    } catch (error) {
        if (isAxiosError(error)) throw error.response.data;
        throw error;
    }
}

export async function deletePostulacion(id) {
    try {
        const { data } = await api.delete(`/postulaciones/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error)) throw error.response.data;
        throw error;
    }
}