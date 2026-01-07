import { getGrupos } from "../services/grupo.service.js";
import { createSolicitud, getSolicitudes as s_getSolicitudes } from "../services/solicitud.service.js";
import { cantidadUsuariosPorGrupo, obtenerUsuariosPorGrupo } from "../services/usuario.service.js";
import { createVoto } from "../services/voto.service.js";

export const SolicitarUnirse = async (req, res) => {
    try {
        const idGrupo = req.query.grupo;
        if (await cantidadUsuariosPorGrupo(idGrupo) <= 0) {
            
        }

        const solicitud = await createSolicitud({rut_usuario: req.user.rut, id_grupo: idGrupo, estado: null});
        return res.status(200).json({message: "Solicitud creada con éxito", data: solicitud});
    } catch (error) {
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

export const VotarSolicitud = async (req, res) => {
    try {
        const idSolicitud = req.query.solicitud;
        const voto = await createVoto({id_solicitud: idSolicitud, id_alumno_votante: req.user.rut});
        return res.status(200).json({message: "Voto creado con éxito", data: voto});
    } catch (error) {
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

export const VerGrupos = async (req, res) => {
    try {
        const grupos = await getGrupos();
        for (let i = 0; i < grupos.length; i++) {
            try {
                grupos[i].inscritos = await obtenerUsuariosPorGrupo(grupos[i].id);
            } catch (error) {
                console.error(error);
            }
        }
        return res.status(200).json({message: "Grupos encontrados con éxito", data: grupos});
    } catch (error) {
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

export const getSolicitudes = async (req, res) => {
    try {
        const solicitudes = await s_getSolicitudes();
    } catch (error) {
        return res.status(500).json({message: "Error interno del servidor"});
    }
}