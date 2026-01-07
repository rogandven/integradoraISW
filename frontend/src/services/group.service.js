import axios from '@services/root.service.js';

export async function getGrupos() {
    try {
        const response = await axios.get('/grupos/ver');
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener grupos:", error);
    }
}