import { createSolicitud } from "../services/solicitud.service.js";
import { createVoto } from "../services/voto.service.js";

export const SolicitarUnirse = async (req, res) => {
    try {
        const idGrupo = req.query.grupo;
        const solicitud = await createSolicitud({rut_usuario: req.user.rut_usuario, id_grupo: idGrupo, estado: null});
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
        
    } catch (error) {
        return res.status(500).json({message: "Error interno del servidor"});
    }
}