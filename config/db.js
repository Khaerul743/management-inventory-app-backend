const {Sequelize,DataTypes} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT || 3307}/${process.env.DB_NAME}`)


const testConnection = async () => {
    try{
        sequelize.authenticate();
        console.log("connection has been established successfully.")
    }catch (error) {
        console.error("unable to connect database "+error)
    }
}

testConnection();

module.exports = {sequelize};