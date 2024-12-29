// src/models/Account.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Comment from './Comment';
import Favorite from './Favorite';

class Account extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public pseudo!: string;
    public dateOfCreation!: Date;
}

Account.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOfCreation: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Account',
    }
);



export default Account;
