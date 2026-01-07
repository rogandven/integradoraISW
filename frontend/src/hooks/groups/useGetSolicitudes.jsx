import { useState } from 'react';
import { getSolicitudes } from '@services/solicitud.service.js';

export const useGetSolicitudes = () => { 
    const [solicitudes, setSolicitudes] = useState([]);
    
    const fetchSolicitudes = async () => {
        try {
            const data = await getSolicitudes();
            setSolicitudes(data);
        } catch (error) {
            console.error("Error consiguiendo grupos:", error);
        }
    };

    return { solicitudes, setSolicitudes, fetchSolicitudes };
}

export default useGetSolicitudes;