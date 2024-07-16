const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken');



async function userSignInController(req, res) {
    try {
        const { email, password } = req.body

        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide password")
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            throw new Error("User not found")
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        console.log("checkPassoword", checkPassword)

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '1m'  });
            const ref_token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_REF_KEY, { expiresIn: 60 * 60 * 8 });

            console.log(token)
            console.log("ref_token --> ",ref_token)
            

            const tokenOption = {
                maxAge: 60000,
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            }
            res.cookie('refresh_Token', ref_token, 
                {maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict'})

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            })



        } else {
            throw new Error("Please check password")
        }




    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }

}

module.exports = userSignInController