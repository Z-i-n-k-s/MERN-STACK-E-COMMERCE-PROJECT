const jwt = require('jsonwebtoken')

async function authToken(req,res,next){
    try{

        const token = req.cookies?.token 

        console.log("ref_token - ",token)

        if(!token){
            // if(renewToken(req, res)) {

            //     jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            //         console.log(err)
            //         console.log("after renew decoded",decoded) // bar
        
        
            //         if(err){
            //             console("auth error ",err)
            //         }
        
            //         req.userId = decoded?._id
             //        next()
        
        
              //     })

                
            // }
            // else{

            //      return res.json({
            //     message : "user not loged-in",
            //     error : true,
            //     success : false,

            // })

            // }
            return res.json({
                message : "user not loged-in",
                error : true,
                success : false,

            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            console.log(err)
            console.log("decoded",decoded) // bar


            if(err){
                console("auth error ",err)
            }

            req.userId = decoded?._id
            next()


          });



      

    }catch(err){

        res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false,
        })
    }
}

const renewToken = (req, res) => {
    const refresh_Token = req.cookies?.refresh_Token;
    console.log("ref token renew - > ",refresh_Token)
    
   // console.log("data in renew ",jwt.decode)
    var exist = false;
    if(!refresh_Token) {
       return res.json({
                message : "user not loged-in",
                error : true,
                success : false,

            })
    } else {
        jwt.verify(refresh_Token, process.env.TOKEN_SECRET_REF_KEY, function(err, decoded){
            console.log("decodedin renew ",decoded) 
            const tokenData = {
                _id: decoded._id,
                email: decoded.email,
            }
            console.log("tokendata in renew ",tokenData) 
            if(err) {
                return res.json({message: "Invalid Refresh Token",error:true,success: false })
            } else {
                
                const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '1m'  });
                console.log("token after renew ->",token)
                const tokenOption = {
                    maxAge: 60000,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None'
                   
                }
                res.cookie("token", token, tokenOption)
                exist = true;
            }
        })
    }
    return exist;
}

module.exports = authToken