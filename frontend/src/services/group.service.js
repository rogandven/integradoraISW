import axios from '@services/root.service.js';

export async function getGrupos() {
    try {
        const response = await axios.get('/grupos/ver');
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener grupos:", error);
    }
}

export async function createSolicitud(id) {
    try {
        const response = await axios.post(`grupos/solicitar?grupo=${id}`);
        return response?.status || 400;
    } catch (error) {
        console.error(error);
        return error?.response?.status || 500;
    }
}