const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/userSignUp")
const userSignInController = require("../controller/userSignIn")
const userDetailsController = require('../controller/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/userLogout')
const allUsers = require('../controller/allUsers')
const updateUser = require('../controller/updateUser')
const userSearchController = require('../controller/userSearch')
const userDeleteController = require('../controller/userDelete')

const updateProfile = require('../controller/updateProfile')

const UploadProductController = require('../controller/uploadProduct')
const getProductController = require('../controller/getProduct')
const updateProductController = require('../controller/updateProduct')


router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)


//admin panel
router.get("/all-user",authToken,allUsers)
router.post("/user-search",userSearchController)
router.post("/update-user",authToken,updateUser)
router.post("/update-profile",authToken,updateProfile)
router.post("/delete-user",authToken,userDeleteController)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)


module.exports = router