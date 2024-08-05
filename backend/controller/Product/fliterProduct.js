const filterProductController = async(req,res)=>{
    try {
        
}catch(err){
    res.json(
        {
            message: err.message || err,
            error: true,
            success : false
        }
    )
}
}