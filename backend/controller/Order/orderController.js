const orderModel = require("../../models/orderModel");
const userModel = require("../../models/userModel");


const orderController = async(req,res)=>{

    const { cartItems ,totalPrice } = req.body
    const user = await userModel.findOne({ _id: req.userId });

    // console.log("cart items ",cartItems)
    // console.log("total price ",totalPrice)


    try{

        const orderDetails = {
            productDetails : cartItems,
            email : user.email,
            userId : user._id,
           
           totalAmount : totalPrice
         }
   
       const order = new orderModel(orderDetails)
       console.log("order ",order);
       
       const saveOrder = await order.save()
       res.status(200).json({
        data:saveOrder,
        message: "Payment is successfull",
        error: false,
        success: true,
    })

    }catch (err) {
        console.log("err",err)
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = orderController