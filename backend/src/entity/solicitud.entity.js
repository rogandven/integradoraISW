"use strict";

import { EntitySchema } from "typeorm";

export const SolicitudEntity = new EntitySchema({
    name: "solicitud",
    tableName: "solicitud",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        rut_usuario: {
            type: String,
            nullable: false,
            foreignKey: {
                target: "usuario",
                inverseSide: "rut",
            }
        },
        id_grupo: {
            type: Number,
            nullable: false,
            foreignKey: {
                target: "grupo",
                inverseSide: "id",
            }
        },
        estado: {
            type: Boolean,
            nullable: true
        }       
    },
});

export default SolicitudEntity;