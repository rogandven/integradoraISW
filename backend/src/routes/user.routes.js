"use strict";
import { Router } from "express";

import { getUsers, getUserById, getProfile, updateUserById, deleteUserById, getUserStats } from "../controllers/user.controller.js";
import { login, register, logout } from "../controllers/user.controller.js";
import { authenticateJwt as isAuthenticated } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.use(isAuthenticated);

router.get("/profile", getProfile);
router.get("/getUserStats", getUserStats);

router.use(isAdmin);

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);


export default router;