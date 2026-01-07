"use strict";

import { EntitySchema } from "typeorm";

export const UserEntity = new EntitySchema({
    name: "grupo",
    tableName: "grupo",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        numero: {
            type: Number,
            nullable: false,
        },
        cantidad_maxima: {
            type: Number,
            nullable: false,
        },
        cantidad_minima: {
            type: Number,
            nullable: false,
        },        
    },
});

export default UserEntity;