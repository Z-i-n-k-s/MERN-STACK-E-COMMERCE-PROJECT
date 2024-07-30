const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;
        const refreshToken = req.cookies?.refresh_token;

        if (!token && !refreshToken) {

            return res.json({
                message: " Plaese LogIn ",

                error: true,
                success: false,
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, async function(err, decoded) {
            if (err) {
                if ((err.name === 'JsonWebTokenError' || err.name === "TokenExpiredError") && refreshToken) {
                    try {
                        const refreshDecoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET_REF_KEY);
                        const newTokenData = {
                            _id: refreshDecoded._id,
                            email: refreshDecoded.email,
                        };

                        const newToken = jwt.sign(newTokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "20m" });

                        const tokenOption = {
                            httpOnly: true,
                            secure: true,
                            sameSite: 'None'
                        };

                        res.cookie("token", newToken, tokenOption);

                        req.userId = newTokenData._id;
                        return next();
                    } catch (refreshErr) {
                       

                        res.clearCookie("refresh_token");
                        res.clearCookie("token");

                        return res.status(401).json({
                            message: "Invalid refresh token. Please log in again.",
                            error: true,
                            success: false,
                        });
                    }
                } else {
                    return res.status(401).json({
                        message: "Invalid token. Please log in again.",
                        error: true,
                        success: false,
                    });
                }
            } else {
                req.userId = decoded?._id;
                next();
            }
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;
