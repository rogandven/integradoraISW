"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import grupoRoutes from "./grupo.routes.js";

const router = new Router();

router.use("/users", userRoutes);
router.use("/grupos", grupoRoutes);

export default router;