"use strict";
import { Router } from "express";

import { authenticateJwt as isAuthenticated } from "../middleware/authentication.middleware.js";
import { SolicitarUnirse, VerGrupos, VotarSolicitud } from "../controllers/grupo.controller.js";

const router = Router();

router.use(isAuthenticated);

router.post("/solicitar", SolicitarUnirse);
router.post("/votar", VotarSolicitud);
router.get("/ver", VerGrupos);

export default router;