import VotoEntity from "../entity/voto.entity.js";
import { AppDataSource } from "../config/configDb.js";

export const votoRepository = AppDataSource.getRepository(VotoEntity);


export const getVotos = async () => {
    try {
        return await votoRepository.find();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getVoto = async (id) => {
    try {
        return await votoRepository.findOne({where: {id: Number(id)}});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createVoto = async (data) => {
    try {
        const votoNuevo = votoRepository.create(data);
        return await votoRepository.save(votoNuevo);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateVoto = async (id, data) => {
    try {
        return await votoRepository.update({id: Number(id)}, data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteVoto = async (id) => {
    try {
        return await votoRepository.delete({where: {id: Number(id)}});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

