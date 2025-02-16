const jwt = require('jsonwebtoken');
const {response} = require('./response')
require('dotenv').config()

const verifyToken = (req,res,next) => {
    console.log("kontol")
    console.log(req.cookies)
    const token = req.cookies.token;
    if(!token) return response(400,"error","Invalid Token",res)
    
    try {
        const verified = jwt.verify(token,process.env.SECRET_KEY)
        req.user = verified;
        next()
    } catch (error) {
        return response(500,"error","Invalid to verify token",res);
    }
}

const authorizationRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                access:false,
                message:"Access denied!"
            })
        }
        next()
    }
}

module.exports = {verifyToken,authorizationRoles}