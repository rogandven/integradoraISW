"use strict";
import { Router } from "express";

import { getUsers, getUserById, getProfile, updateUserById, deleteUserById, getUserStats } from "../controllers/user.controller.js";
import { authenticateJwt as isAuthenticated } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";
import { SolicitarUnirse, VerGrupos, VotarSolicitud } from "../controllers/grupo.controller.js";

const router = Router();

router.use(isAuthenticated);

router.post(SolicitarUnirse);
router.post(VotarSolicitud);
router.get(VerGrupos);


export default router;