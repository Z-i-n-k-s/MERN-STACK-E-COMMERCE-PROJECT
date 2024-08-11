const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/User/userSignUp")
const userSignInController = require("../controller/User/userSignIn")
const userDetailsController = require('../controller/User/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/User/userLogout')
const allUsers = require('../controller/User/allUsers')
const updateUser = require('../controller/User/updateUser')
const userSearchController = require('../controller/User/userSearch')
const userDeleteController = require('../controller/User/userDelete')

const updateProfile = require('../controller/User/updateProfile')

const UploadProductController = require('../controller/Product/uploadProduct')
const getProductController = require('../controller/Product/getProduct')
const updateProductController = require('../controller/Product/updateProduct')
const getCatagoryProduct = require('../controller/Product/getCatagoryProduct')
const getCatagoryWiseProduct = require('../controller/Product/getCatagoryWiseProduct')
const getProductDetails = require('../controller/Product/getProductDetails')
const addToCartController = require('../controller/User/addToCartController')
const countCartProduct = require('../controller/User/countCartProduct')
const addToCartViewProduct = require('../controller/User/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/User/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/User/deleteAddToCartProduct')
const searchProduct = require('../controller/Product/searchProduct')
const filterProductController = require('../controller/Product/fliterProduct')
const orderController = require('../controller/Order/orderController')
const orderListController = require('../controller/Order/orderListController')
const allOrderController = require('../controller/Order/allOrderController')
const deleteProductController = require('../controller/Product/deleteProduct')
const deleteAllAddToCartProducts = require('../controller/User/clearAddToCart')




router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.post("/user-details",authToken,userDetailsController)
router.post("/userLogout",userLogout)


//admin panel
router.post("/all-user",authToken,allUsers)
router.post("/user-search",userSearchController)
router.post("/update-user",authToken,updateUser)
router.post("/update-profile",authToken,updateProfile)
router.post("/delete-user",authToken,userDeleteController)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCatagoryProduct)
router.post("/category-product",getCatagoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)
router.post('/delete-product',authToken,deleteProductController)
router.post('/clear-cart',authToken,deleteAllAddToCartProducts)


//user product add to cart

router.post("/addtocart",authToken,addToCartController)
router.post("/countCartProduct",authToken,countCartProduct)
router.post("/view-cart-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

//order

router.post("/order",authToken,orderController)
router.post('/order-list',authToken,orderListController)
router.post('/all-orders',authToken,allOrderController)




module.exports = router