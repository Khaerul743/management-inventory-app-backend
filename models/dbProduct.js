const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/db')


const Product = sequelize.define('Product',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    nama:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    kategori:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    stok:{
        type:DataTypes.INTEGER,
        default:0,
    },
    harga:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
},{
    tableName:"products",
    timestamps:false,
})

module.exports = {Product};