const orderModel = require("../../models/orderModel");
const userModel = require("../../models/userModel");

const allOrderController = async(request,response)=>{
    try{
    const userId = request.userId

    const user = await userModel.findById(userId)

    if(user.role !== 'ADMIN'){
        return response.status(500).json({
            message : "not access"
        })
    }

    const allOrder = await orderModel.find().sort({ createdAt : -1 })

    return response.status(200).json({
        data : allOrder,
        success : true,
        error:false
    })}
    catch(err){
        response.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }

}

module.exports = allOrderController