"use strict";
import { SESSION_SECRET } from "../config/configEnv.js";
import jwt from "jsonwebtoken";
import { userRepository } from "../services/usuario.service.js";

export function authenticateJwt(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Token no proporcionado" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SESSION_SECRET);
    const additionalData = userRepository.findOne({where: {rut: decoded.rut}});
    if (!additionalData) {
      throw Error("lol");
    }
    req.user = decoded;
    Object.assign(req.user, additionalData);
    next();
    
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}