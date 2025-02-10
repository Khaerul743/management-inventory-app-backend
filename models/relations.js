const {Product} = require('./dbProduct');
const {User} = require('./dbUser')
const {Order} = require('./dbOrder')

User.hasMany(Order,{foreignKey:'userId'});
Order.belongsTo(User,{foreignKey:'userId'});

Product.hasMany(Order,{foreignKey:'productId'});
Order.belongsTo(Product,{foreignKey:'productId'})

module.exports = {Product,User,Order}