"use strict";
import UsuarioEntity from "../entity/usuario.entity.js";
import { AppDataSource } from "../config/configDb.js";
import jwt from "jsonwebtoken";
import { encryptPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { SESSION_SECRET } from "../config/configEnv.js";
import {
  registerValidation,
  loginValidation,
} from "../validations/auth.validation.js";


const userRepository = AppDataSource.getRepository(UsuarioEntity);

export async function getUsers(req, res) {
  try {
    const users = await userRepository.find();
    res.status(200).json({ message: "Usuarios encontrados: ", data: users });
  } catch (error) {
    console.error("Error en user.controller.js -> getUsers(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({ message: "Usuario encontrado: ", data: user });
  } catch (error) {
    console.error("Error en user.controller.js -> getUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function updateUserById(req, res) {
  try {
    const { id } = req.params;
    const { username, email, rut } = req.body;
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.rut = rut || user.rut;

    await userRepository.save(user);

    res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente.", data: user });
  } catch (error) {
    console.error("Error en user.controller.js -> updateUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    await userRepository.remove(user);

    res.status(200).json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    console.error("Error en user.controller.js -> deleteUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function getProfile(req, res) {
  try {
    const userEmail = req.user.email;
    const user = await userRepository.findOne({ where: { email: userEmail } });
    
    if (!user) {
      return res.status(404).json({ message: "Perfil no encontrado." });
    }

    const formattedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      rut: user.rut,
      role: user.role
    };

    res.status(200).json({ message: "Perfil encontrado: ", data: formattedUser });
  } catch (error) {
    console.error("Error en user.controller -> getProfile(): ", error);
    res.status(500).json({ message: "Error interno del servidor"})
  }
}

export async function getUserStats(req, res) {
  try {
    const usuariosCreados = await userRepository.count();
    const usuarios = await userRepository.count({where: {role: "usuario"}});
    const admninistradores = await userRepository.count({where: {role: "administrador"}});
    res.status(200).json({ 
      usuariosCreados: Number(usuariosCreados || 0),
      usuarios: Number(usuarios || 0),
      admninistradores: Number(admninistradores || 0),
    });
  } catch (error) {
    console.error("Error en user.controller.js -> getUserStats(): ", error);
    res.status(200).json({ 
      usuariosCreados: 0,
      usuarios: 0,
      admninistradores: 0,
    });
  }
}

export async function register(req, res) {
  try {
    const { username, rut, email, password } = req.body;
    const { error } = registerValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const existingEmailUser = await userRepository.findOne({
      where: { email },
    });
    if (existingEmailUser)
      return res.status(409).json({ message: "Correo ya registrado." });

    const existingRutUser = await userRepository.findOne({ where: { rut } });
    if (existingRutUser)
      return res.status(409).json({ message: "Rut ya registrado." });

    const newUser = userRepository.create({
      username,
      email,
      rut,
      password: await encryptPassword(password),
    });
    await userRepository.save(newUser);

    const { contraseña, ...dataUser } = newUser;

    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente!", data: dataUser });
  } catch (error) {
    console.error("Error en auth.controller.js -> register(): ", error);
    return res.status(500).json({ message: "Error al registrar el usuario" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { error } = loginValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const userFound = await userRepository.findOne({ where: { email } });
    if (!userFound)
      return res
        .status(404)
        .json({ message: "El correo electrónico no está registrado" });

    const isMatch = await comparePassword(password, userFound.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "La contraseña ingresada no es correcta" });

    const payload = {
      username: userFound.username,
      email: userFound.email,
      rut: userFound.rut,
      rol: userFound.role,
    };
    const accessToken = jwt.sign(payload, SESSION_SECRET, { expiresIn: "1d" });

    res.status(200).json({ message: "Inicio de sesión exitoso", accessToken });
  } catch (error) {
    console.error("Error en auth.controller.js -> login(): ", error);
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt", { httpOnly: true });
    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al cerrar sesión" });
  }
}