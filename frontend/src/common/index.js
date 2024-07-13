
import SignUP from "../pages/SignUP"

const backendDomin = process.env.REACT_APP_BACKEND_URL//"http://localhost:8080"


const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user :{
        url : `${backendDomin}/api/userLogout`,
        method : "get"
    },
    allUser:{
        url : `${backendDomin}/api/all-user`,
        method: 'get'
    },
    userSearch:{
       url : `${backendDomin}/api/user-search`,
        method: 'post'
    },
    updateUser:{ 

        url : `${backendDomin}/api/update-user`,
        method: 'post'
    
    },
    updateProfile:{ 

        url : `${backendDomin}/api/update-profile`,
        method: 'post'
    
    },
    deleteUser:{ 

        url : `${backendDomin}/api/delete-user`,
        method: 'post'
    
    },
    uploadProduct:{ 

        url : `${backendDomin}/api/upload-product`,
        method: 'post'
    
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct:{
        url : `${backendDomin}/api/update-product`,
        method : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'get'
    },
    
}

export default SummaryApi