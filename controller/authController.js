const jwt = require('jsonwebtoken')
require('dotenv').config()
const {User} = require('../models/relations');
const  {registerValidation,loginValidation} = require('../config/validation');
const {hashPass,comparePass} = require('../utils/bcrypt')
const {response} = require('../utils/response')

const register = async (req,res) => {
    const data = req.body;
    try {
        const emailExist = await User.findOne({where:{email:data.email}})
        data.password.toString()
        
        if(registerValidation(data)) return response(400,0,registerValidation(data),res);
        if(emailExist) return response(400,"error","Email is already in use",res);

        const hashedPass = await hashPass(req.body.password,10);
        req.body.password = hashedPass
        const newData = User.create(req.body);
        return response(200,newData,"Data added succesfully",res)
    } catch (error) {
        return response(400,"error",error,res)
    }
}

const login = async (req,res) => {
    const data = req.body;

    try {
        if(loginValidation(data)) return response(400,"error",loginValidation(data),res)
        const user = await User.findOne({where:{email:data.email}})
        
        if(!user) return response(400,"error","user not found",res)
        const validPassword = await comparePass(user.password,data.password);
        if(!validPassword) return response(400,0,"Invalid password",res)
        
        jwt.sign({id:user.id,role:user.role},process.env.SECRET_KEY,{expiresIn:'1h'},(err,token) => {
            res.cookie('token',token,{
                httpOnly:true,
            })
            return response(200,{
                name : user.name,
                email:user.email,
            },"Login is successfully",res)
        })
        

    } catch (error) {
        return response(400,"error",error,res)
    }
    
}

const showProfile = async (req,res) => {
    try {
        const user = await User.findByPk({id:req.user.id});
        if(!user) return response(400,"not found","server error",res)
        return response(200,user,"Get data from user",res);
    } catch (error) {
        return response(400,"error",error,res);
    }
}

const handleLogout = (req,res) => {
    try {
        res.clearCookie('token');
        return res.send("logout");
    } catch (error) {
        return res.send(error);
    }
}
module.exports = {register,login,showProfile,handleLogout}