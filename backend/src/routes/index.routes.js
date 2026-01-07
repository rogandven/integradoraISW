"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";

const router = new Router();

router.use("/users", userRoutes);

export default router;