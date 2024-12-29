// src/models/Ingredient.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Ingredient extends Model {
    public id!: number;
    public name!: string;
}

Ingredient.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Ingredient',
    }
);

export default Ingredient;
