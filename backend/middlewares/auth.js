const jwt = require("jsonwebtoken");

const isAuthenticated = (req,res,next) => {
    const {token} = req.cookies

    if(!token){
        return res.status(401).json({
            message:"Login first",
            success:false,
        })
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode.user;
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid token, please log in again"})
    }
}

module.exports = isAuthenticated;