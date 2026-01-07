"use strict";

// import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";
import UsuarioEntity from "../entity/usuario.entity.js";

export async function createUsers() {
    try {
        const userRepository = AppDataSource.getRepository(UsuarioEntity);

        const count = await userRepository.count();
        if (count > 0) return;
        const users = [
            {
                rut: "12345678-9",
                nombres: "Roger Andres", 
                apellidos: "Venegas Opazo",
                email: "rogervenegas@gmail.com",
                contrasenia: await encryptPassword("minecraft"),
                tipo_usuarios: "administrador",
                id_grupo: null
            }
        ]

        console.log("Creando usuarios...");

        for (const user of users) {
            await userRepository.save((
                userRepository.create(user)
            ));
            console.log(`Usuario '${user.username}' creado exitosamente.`);
        }
    } catch (error) {
        console.error("Error al crear usuarios: ", error);
        process.exit(1);
    }
}