import { useState } from 'react';
import { getGrupos } from '@services/group.service.js';

export const useGetGroups = () => { 
    const [groups, setGroups] = useState([]);
    
    const fetchGroups = async () => {
        try {
            const data = await getGrupos();
            setGroups(data);
        } catch (error) {
            console.error("Error consiguiendo grupos:", error);
        }
    };

    return { groups, setGroups, fetchGroups };
}

export default useGetGroups;