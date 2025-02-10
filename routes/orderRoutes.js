const express = require('express')
const router = express.Router()
const {verifyToken,authorizationRoles} = require('../utils/verifyToken')
const {createOrder,listOrder,updateOrder,deleteOrder,myOrder} = require('../controller/orderController');

router.get('/',verifyToken,authorizationRoles('admin'),listOrder)
router.get('/myOrder',verifyToken,authorizationRoles('customer'),myOrder)
router.post('/:productId',verifyToken,authorizationRoles('customer'),createOrder)
router.put('/:id',verifyToken,authorizationRoles('admin','employee'),updateOrder)
router.delete('/:id',verifyToken,authorizationRoles('customer','admin'),deleteOrder)

module.exports = router