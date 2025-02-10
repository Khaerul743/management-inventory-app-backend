const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize')

const Order = sequelize.define('order',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'users',
            key:'id',
        }
    },
    productId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'products',
            key:'id'
        }
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    status:{
        type:DataTypes.ENUM("pending","process","done"),
        defaultValue:"pending"
    },
    date:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    }
},{
    tableName:"orders",
    timestamps:false
})

module.exports = {Order}

