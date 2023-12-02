const sequelize = require('sequelize');
const connection = new sequelize('facial','root','Higor120783',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = connection;