const express = require('express');
const router = (express.Router());
const {register,login,handleLogout} = require('../controller/authController');
const { verifyToken, authorizationRoles } = require('../utils/verifyToken');


router.post('/register',register)
router.post('/login',login)
router.post('/logout',handleLogout)

module.exports = router