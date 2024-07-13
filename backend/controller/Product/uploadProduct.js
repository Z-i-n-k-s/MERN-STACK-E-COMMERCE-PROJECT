const uploadproductpermission = require("../../helpers/permission")
const ProductModel = require("../../models/productModel")

async function UploadProductController(req,res){
    try{

        const sessionUserId = req.userId
        if(!uploadproductpermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const UploadProduct = new ProductModel(req.body)
        const saveProduct  = await UploadProduct.save()

        res.status(201).json({
            message : "Product uploaded successfully",
            data : saveProduct,
            error : false,
            success : true,
        })
        
    }
    catch(err){

        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}

module.exports = UploadProductController