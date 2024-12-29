// src/models/Favorite.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Recipe from './Recipe';
import Account from './Account';

class Favorite extends Model {
    public id!: number;
    public dateAdded!: Date;
    public recipeId!: number;
    public userId!: number;
}

Favorite.init(
    {
        dateAdded: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Favorite',
    }
);



export default Favorite;
