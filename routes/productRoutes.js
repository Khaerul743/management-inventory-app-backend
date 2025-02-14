const express = require('express');
const router = express.Router();
const {verifyToken,authorizationRoles} = require('../utils/verifyToken')
const {listProduct,addProduct,updateProduct,deleteProduct,detailProduct} = require('../controller/productController')

router.get('/',listProduct)
router.get('/:id',detailProduct)
router.post('/',addProduct);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);

module.exports = router;