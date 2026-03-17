const userModel=require('../models/user.model');
const JWT=require('jsonwebtoken');


async function authMiddleware(req,res,next){
    const token =req.cookies.token || req.header.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message:"UNAUTHORIZED ACCESS, TOKEN MISSING"
        })
    }

    try{
        const decoded=JWT.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded.userID);

        if(!user){
            return res.status(401).json({
                message:"UNAUTHORIZED ACCESS, INVALID TOKEN"
            })
        }

        req.user=user;
        next();
    }catch(err){
        return res.status(401).json({
            message:"UNAUTHORIZED ACCESS, INVALID TOKEN"
        })
    }
}

module.exports={authMiddleware};