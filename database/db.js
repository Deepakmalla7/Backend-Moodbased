const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('Web','postgres','admin123',{
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false
})



module.exports = sequelize;
   