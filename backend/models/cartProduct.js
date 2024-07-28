const mongoose  = require('mongoose')


const addToCart = new mongoose.Schema({
    
    productId : String,
    quantity : Number,
    userId : String,


},{
    timestamps : true
})

const addToCartModel = mongoose.model("addToCart",addToCart)

module.exports = addToCartModel
