import GrupoEntity from "../entity/grupo.entity.js";
import { AppDataSource } from "../config/configDb.js";

export const grupoRepository = AppDataSource.getRepository(GrupoEntity);


export const getGrupos = async () => {
    try {
        return await grupoRepository.find({relations: {usuario: true}});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getGrupo = async (id) => {
    try {
        return await grupoRepository.findOne({where: {id: Number(id)}});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createGrupo = async (data) => {
    try {
        return await grupoRepository.save(data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateGrupo = async (id, data) => {
    try {
        return await grupoRepository.update({id: Number(id)}, data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteGrupo = async (id) => {
    try {
        return await grupoRepository.delete({where: {id: Number(id)}});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

