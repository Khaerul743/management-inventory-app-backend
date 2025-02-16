const {User} = require('../models/relations')
const {response} = require('../utils/response')

const showProfile = async (req,res) => {
    try { 
        const user = await User.findByPk(req.user.id)
        const {id,name,email} = user;
        return response(200,{id,name,email},"Get data user",res);
    } catch (error) {
        return response(500,"error",error,res);
    }
}

const showAllUser = async (req,res) => {
    try {
        const users = await User.findAll()
        if(!users) return response(404,0,"not found",res)
        return response(200,users,"Get all data from users",res);
        
    } catch (error) {
        return response(500,0,error,res)
    }
}

const updateUser = async (req,res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if(!user) return response(404,0,"User not found",res);
        const [updated,data] = await User.update({
            role:req.body.role,
        },{
            where:{id:req.params.id}
        })
        
        return response(200,data,"Update data is successfully",res)
    } catch (error) {
        return response(500,0,error,res)  
    }
}
const deleteUser = async (req,res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if(!user) return response(404,0,"User not found",res);
        const deleted = await User.destroy({
            where:{id:req.params.id}
        })
        
        return response(200,deleted,"delete data is successfully",res)
    } catch (error) {
        return response(500,0,error,res)  
    }
}

module.exports = {showProfile,showAllUser,updateUser,deleteUser}