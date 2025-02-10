const {Order} = require('../models/relations');
const {response} = require('../utils/response')

const listOrder = async (req,res) => {
    const orders = await Order.findAll()
    try {
        return response(200,orders,"Get all data from orders",res)
    } catch (error) {
        return response(500,'error',error,res);
    }
}

const createOrder = async (req,res) => {
    const userId = req.user.id
    const productId = req.params.productId
    const {amount} = req.body
    try {
        const order = await Order.create({userId,productId,amount});
        if(!order) return response(500,"error","Failed to place an order",res)
        return response(201,order,"Order was succesfully placed",res)
    } catch (error) {
        return response(500,"error",error,res)
    }
}
const updateOrder  = async (req,res) => {
    const {status} = req.body;
    try {
        const allowedStatus = ['pending', 'process', 'done'];
        if (!allowedStatus.includes(status)) {
            return response(400,"error","Invalid status",res)
        }
        const [updated,data] = await Order.update({
            status:status
        },{
            where:{id:req.params.id},
            returning:true,
        })
        if(data) return response(200,data,"Status updated successfully",res)
        else return response(400,"error","Order not found or status is same",res);
    } catch (error) {
        return response(500,"error",error,res);
    }
}

const deleteOrder = async (req,res) => {
    try {
        const id = req.params.id;
        const deleted = await Order.destroy({
            where:{id:id}
        })
    
        if(deleted) return response(200,deleted,"Deleted order is successfully",res)
        return response(400,"error","Order not found",res)
    } catch (error) {
        console.log(error)
        response(500,"error",error,res);
    }

}

const myOrder = async (req,res) => {
    try {
        const orders = await Order.findAll({
            where:{userId:req.user.id}
        })
        if(!orders) return response(404,0,"Order not found",res);
        return response(200,orders,"Get orders",res)
    } catch (error) {
        return response(500,0,error,res);
    }
}

module.exports = {createOrder,listOrder,updateOrder,deleteOrder,myOrder}