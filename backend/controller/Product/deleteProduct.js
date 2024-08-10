const uploadproductpermission = require("../../helpers/permission")
const ProductModel = require("../../models/productModel")

async function deleteProductController(req,res){
    try{
        if(!uploadproductpermission(req.userId)){
            throw new Error("Permission denied")
        }

        const {_id, ...resBody}=req.body 
        const deleteProduct = await ProductModel.findByIdAndDelete(_id,resBody)
       console.log("deleteProduct ",deleteProduct)
       res.json({
        message : "Product Deleted successfully",
       
        success : true,
        error : false
    })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}
module.exports = deleteProductController