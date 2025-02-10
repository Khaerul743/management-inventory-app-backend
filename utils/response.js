const response = (status_code,data,message,res) => {
    res.status(status_code).json({
        payload:{
            status:status_code,
            datas:data,
            message:message
        },
        pagination:{
            prev:"",
            next:"",
            max:""
        }
    })
}

module.exports = {response}