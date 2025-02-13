const express = require('express');
const router = express.Router();
const {verifyToken,authorizationRoles} = require('../utils/verifyToken')
const {listProduct,addProduct,updateProduct,deleteProduct,detailProduct} = require('../controller/productController')

router.get('/',listProduct)
router.get('/:id',verifyToken,authorizationRoles('admin','employee','customer'),detailProduct)
router.post('/',addProduct);
router.put('/:id',verifyToken,authorizationRoles('admin','employee'),updateProduct);
router.delete('/:id',verifyToken,authorizationRoles('admin','employee'),deleteProduct);

module.exports = router;