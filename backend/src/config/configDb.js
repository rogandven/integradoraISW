"use strict";
import { DataSource } from "typeorm"
import { DATABASE, DB_USERNAME, PASSWORD, DB_HOST, DB_PORT } from "./configEnv.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: `${DB_HOST}`,
    port: `${DB_PORT}`,
    username: `${DB_USERNAME}`,
    password: `${PASSWORD}`,
    database: `${DATABASE}`,
    entities: ["src/entity/**/*.js"],
    synchronize: true,
    logging: false,
});

export async function connectDB() {
    try {
        await AppDataSource.initialize();
        console.log("=> Conexión con la base de datos exitosa!");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        process.exit(1);
    }
}