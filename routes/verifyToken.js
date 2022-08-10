const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers.authorization
    if(authHeader && req.headers.authorization.startsWith("Bearer")){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err,user) =>{
            if(err) res.status(403).json("Token is not valid!");
            req.user = user
            next();
        } )

    }else{
        return res.status(401).json("You are not authenticated!");
    }

};

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.accountType === "Admin"){
            next()

        }else{
            res.status(403).json("you are not allowed to do that!");
        }
    });
};
// only admin can insert , delete , update
const verifyTokenAnAdmin = (req,res,next) => {
    verifyToken(req,res, () => {
        if(req.user.accountType === "Admin"){
            next();
        }else{
            res.status(403).json("You are not allowed to do that")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization,verifyTokenAnAdmin};