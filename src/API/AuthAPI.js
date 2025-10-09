import api from "../lib/axios";
import { isAxiosError } from "axios";

// Funcion test que apunta al endpoint del backend
export async function authTest () {
    try {
        const { data } = await api.get('/auth')
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            throw error.response.data
        }
    }
}

