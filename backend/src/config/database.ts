const MDP_DATABASE = "PASSWORD HERE"; //mot de passe de votre database Postgres


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("CookingApp", "postgres", MDP_DATABASE, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});


export default sequelize;
