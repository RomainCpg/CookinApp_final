// src/models/Comment.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Recipe from './Recipe';
import Account from './Account';

class Comment extends Model {
    public id!: number;
    public content!: string;
    public datePosted!: Date;
    public rating!: number;
    public recipeId!: number;
    public authorId!: number;
}

Comment.init(
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        datePosted: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 5,
            },
        },
    },
    {
        sequelize,
        modelName: 'Comment',
    }
);



export default Comment;
