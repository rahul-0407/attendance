const jwt = require("jsonwebtoken");
const JWT_SECRET = "qwertyuikmnhytfvfredsxz";

const isAuthenticated = (req,res,next) => {
    const token = req.header('authToken')

    if(!token){
        return res.status(401).json({
            message:"Login first",
            success:false,
        })
    }

    const data = jwt.verify(token,JWT_SECRET);

    req.user = data.user;
    next();
}

module.exports = isAuthenticated;