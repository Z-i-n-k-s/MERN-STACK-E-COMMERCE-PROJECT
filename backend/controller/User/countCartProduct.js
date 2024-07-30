const addToCartModel = require("../../models/cartProduct")


const countCartProduct = async(req,res)=>{
    try{
        const userId=req.userId

        const count =await addToCartModel.countDocuments({
            userId:userId
        })

        res.json({
            data : {
                count:count
            },
            message :"items in cart is  ",
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false,
        })
    }
}
module.exports = countCartProduct