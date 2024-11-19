const jwt = require("jsonwebtoken")

const sendCookies = async (data,res,status) => {
    const authToken = jwt.sign(data,process.env.JWT_SECRET,{expiresIn:'15min'})

    res.status(status).cookie("token",authToken,{
        httpOnly:true,
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 15 *60 * 1000,
        sameSite:'Strict'
    })
}

module.exports = sendCookies