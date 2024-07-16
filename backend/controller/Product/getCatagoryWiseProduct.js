const ProductModel = require("../../models/productModel")

const getCatagoryWiseProduct = async (req,res)=>{
    try{
        const { category } = req?.body || req?.query
        const product =await ProductModel.find ({ category })
          
        res.json({
            message: "Product",
            data: product,
            success: true,
            error: false
        })
    }catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}
module.exports = getCatagoryWiseProduct