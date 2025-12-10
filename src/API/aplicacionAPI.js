import api from '../lib/axios';
import { isAxiosError } from 'axios';

// --- PASANTE ---
export async function crearAplicacion(datos) {
    try {
        // datos = { postulacionId, mensaje }
        const { data } = await api.post('/aplicaciones', datos);
        return data;
    } catch (error) {
        if (isAxiosError(error)) throw error.response.data;
        throw error;
    }
}

export async function getMisAplicaciones() {
    try {
        const { data } = await api.get('/aplicaciones/my-history');
        return data;
    } catch (error) {
        if (isAxiosError(error)) throw error.response.data;
        throw error;
    }
}

// --- EMPRESA ---
export async function getCandidatosPorOferta(postulacionId) {
    try {
        const { data } = await api.get(`/aplicaciones/postulacion/${postulacionId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error)) throw error.response.data;
        throw error;
    }
}