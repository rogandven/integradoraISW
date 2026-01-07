"use strict";

import { EntitySchema } from "typeorm";

export const UsuarioEntity = new EntitySchema({
    name: "usuario",
    tableName: "usuario",
    columns: {
        rut: {
            type: String,
            primary: true,
        },
        nombres: {
            type: String,
            nullable: false,
        },
        apellidos: {
            type: String,
            nullable: false,
        },        
        email: {
            type: String,
            unique: true,
            nullable: false,
        },
        contrasenia: {
            type: String,
            nullable: false,
        },
        tipo_usuarios: {
            type: String,
            default: "estudiante",
            nullable: false,
        },
        id_grupo: {
            type: Number,
            nullable: true,
            foreignKey: {
                target: "grupo", // CountryEntity
                inverseSide: "id",
            },
        }
    },
});

export default UsuarioEntity;