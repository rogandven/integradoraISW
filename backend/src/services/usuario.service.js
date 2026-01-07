import UsuarioEntity from "../entity/usuario.entity.js";
import { AppDataSource } from "../config/configDb.js";

export const userRepository = AppDataSource.getRepository(UsuarioEntity);

export const obtenerUsuariosPorGrupo = async (id_grupo) => {
    try {
        const usuarios = (await userRepository.find({where: {id_grupo: id_grupo}})) || [];
        return usuarios;
    } catch (error) {
        return [];
    }
}