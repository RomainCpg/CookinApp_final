// src/models/RecipeIngredient.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Recipe from './Recipe';
import Ingredient from "./Ingredient";

class RecipeIngredient extends Model {
    public id!: number;
    public quantity!: number;
    public ingredientId!: number;
    public recipeId!: number;
}

RecipeIngredient.init(
    {
        quantity: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'RecipeIngredient',
    }
);



export default RecipeIngredient;
