import api from "../lib/axios";
import { isAxiosError } from "axios";

// --- GET: Obtener mi perfil ---
export async function getMyProfile() {
    try {
        const { data } = await api.get('/pasantes/profile/me');
        return data;
    } catch (error) {
        if (isAxiosError(error)) throw error.response.data;
        throw new Error("Error desconocido");
    }
}

// --- GET: Obtener perfil público (por ID) ---
export async function getPublicProfile(id) {
    try {
        const { data } = await api.get(`/pasantes/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error)) throw error.response.data;
        throw new Error("Error desconocido");
    }
}

// --- POST: Subir Foto de Perfil ---
export async function uploadFotoPerfil(formData) {
    try {
        const { data } = await api.post('/pasantes/upload-foto', formData, {
            headers: { 'Content-Type': 'multipart/form-data' } // Importante para archivos
        });
        return data;
    } catch (error) {
        if (isAxiosError(error)) throw error.response.data;
        throw new Error("Error al subir imagen");
    }
}

// --- POST: Subir CV ---
export async function uploadCV(formData) {
    try {
        const { data } = await api.post('/pasantes/upload-cv', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return data;
    } catch (error) {
        if (isAxiosError(error)) throw error.response.data;
        throw new Error("Error al subir CV");
    }
}