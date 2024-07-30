async function userLogout(req,res){
    try{
        res.clearCookie("refresh_token")
        res.clearCookie("token")

        res.json({
            message : "User Logged out successfully",
            error : false,
            success : true,
            data : []
        })
    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}


module.exports = userLogout