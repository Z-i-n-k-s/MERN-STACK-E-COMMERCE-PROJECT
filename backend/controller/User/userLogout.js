async function userLogout(req, res) {
    try {
        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/' // Adjust path if needed
        };

        res.clearCookie('token', tokenOption);
        res.clearCookie('refresh_token', tokenOption);

        res.cookie('token', '', { ...tokenOption, expires: new Date(0) });
        res.cookie('refresh_token', '', { ...tokenOption, expires: new Date(0) });

        res.status(200).json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userLogout;
