const {response} = require('../utils/response');
const {Product} = require('../models/relations')


const listProduct = async (req,res) => {
    try{
        const products = await Product.findAll()
        return response(200,products,"Get all data from products",res);
    }catch (error){
        return response(500,"not found","error fetching data",res);
    }
}

const addProduct = async (req,res) => {
    try{
        console.log(req.body)
        const newProduct = await Product.create(req.body);
        return response(200,newProduct,"added data is successfully",res)
    }catch(error){
        return response(500,"error",error,res);
    }
}

const updateProduct = async (req,res) => {
    try{
        const id = req.params.id
        const {nama,kategory,stok,harga} = req.body;
        const [updated,data] = await Product.update({
            nama : nama,
            kategory: kategory,
            stok:stok,
            harga : harga,
        },{
            where: {id:id},
            returning:true,
        })
        if(data){
            return response(200,data,"updated is succesfully",res);
        }else{
            return response(200,"product not found","product not found",res)
        }
    }catch (error) {
        return response(500,"not found",error,res);
    }
}

const deleteProduct = async (req,res) => {
    try{
        const id = req.params.id;
        const deleted = await Product.destroy({
            where:{id:id},
        })
        if(!deleted) return response(200,"product not found","error",res);
        return response(200,deleted,"deleted is successfully",res)
    }catch (error) {
        return response(400,0,error,res)
    }
    
}

const detailProduct = async (req,res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if(!product) return response(404,0,"Product not found",res);
        return response(200,product,"Get product from Products",res)
    } catch (error) {
        return response(500,0,error,res);
    }
}

module.exports = {listProduct,addProduct,updateProduct,deleteProduct,detailProduct};