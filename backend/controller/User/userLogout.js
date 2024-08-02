async function userLogout(req,res){
    try{
        const tokenOption = {
            httpOnly : true,
            secure : true,
            sameSite : 'None'
        }
        res.clearCookie("refresh_token",tokenOption)
        res.clearCookie("token",tokenOption)

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