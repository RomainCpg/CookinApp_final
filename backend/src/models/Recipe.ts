// src/models/Recipe.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import RecipeIngredient from './RecipeIngredient';
import Comment from './Comment';
import Favorite from './Favorite';

class Recipe extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public timeToPrepareInMinute!: number;
    public averageRating!: number;

    //Méthode pour mettre à jour le rating d'une recette
    public static async updateAverageRating(recipeId: number): Promise<void> {
        const comments = await Comment.findAll({
            where: { recipeId },
            attributes: ['rating'],
        });

        const ratings = comments.map((comment) => comment.rating).filter((rating) => rating !== null);

        const averageRating = ratings.length > 0
            ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
            : null;

        await Recipe.update(
            { averageRating },
            { where: { id: recipeId } }
        );
    }

}

Recipe.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        timeToPrepareInMinute: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        averageRating: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Recipe',
    }
);



export default Recipe;
