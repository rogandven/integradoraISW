import SolicitudEntity from "../entity/solicitud.entity.js";
import { AppDataSource } from "../config/configDb.js";

export const solicitudRepository = AppDataSource.getRepository(SolicitudEntity);


export const getSolicitudes = async () => {
    try {
        return await solicitudRepository.find({relations: {rut_usuario: true, id_grupo: true}});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getSolicitud = async (id) => {
    try {
        return await solicitudRepository.findOne({where: {id: Number(id)}});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createSolicitud = async (data) => {
    try {
        const solicitudNueva = solicitudRepository.create(data);
        return await solicitudRepository.save(solicitudNueva);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateSolicitud = async (id, data) => {
    try {
        return await solicitudRepository.update({id: Number(id)}, data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteSolicitud = async (id) => {
    try {
        return await solicitudRepository.delete({where: {id: Number(id)}});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

