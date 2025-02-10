const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/db')


const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    role:{
        type:DataTypes.ENUM('admin','employee','customer'),
        defaultValue:'customer',
    },
},{
    tableName:"users",
    timestamps:false,
})

module.exports = {User};