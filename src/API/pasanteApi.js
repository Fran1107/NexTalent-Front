import api from '../lib/axios';
import { isAxiosError } from 'axios';

// --- FUNCIONES DE LECTURA Y CRUD GENERAL ---

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

// --- FUNCIONES DE PERFIL PROPIO (AUTH REQUERIDA) ---

// Obtener mi perfil
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

// Actualizar mi perfil
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

// Eliminar mi cuenta
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

// --- NUEVAS FUNCIONES DE ARCHIVOS (Integradas del compañero) ---

// Subir Foto de Perfil
export async function uploadFotoPerfil(formData) {
    try {
        const { data } = await api.post('/pasantes/upload-foto', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al subir imagen");
        }
        throw error;
    }
}

// Subir CV
export async function uploadCV(formData) {
    try {
        const { data } = await api.post('/pasantes/upload-cv', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al subir CV");
        }
        throw error;
    }
}