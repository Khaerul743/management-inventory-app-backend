const express = require('express')
const router = express.Router()
const {showProfile,showAllUser,updateUser,deleteUser} = require('../controller/userController')
const { verifyToken,authorizationRoles } = require('../utils/verifyToken')

router.get('/profile',verifyToken,showProfile)
router.get('/',verifyToken,authorizationRoles('admin'),showAllUser)
router.put('/:id',verifyToken,authorizationRoles('admin'),updateUser);
router.delete('/:id',verifyToken,authorizationRoles('admin'),deleteUser)

module.exports = router