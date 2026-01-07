"use strict";

import { EntitySchema } from "typeorm";

export const VotoEntity = new EntitySchema({
    name: "voto",
    tableName: "voto",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        id_solicitud: {
            type: Number,
            nullable: false,
            foreignKey: {
                target: "solicitud",
                inverseSide: "id",
            }
        },
        id_alumno_votante: {
            type: String,
            nullable: false,
            foreignKey: {
                target: "usuario",
                inverseSide: "rut",
            }
        }        
    },
});

export default VotoEntity;