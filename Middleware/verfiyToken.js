import jwt from 'jsonwebtoken'
import { errorHandle } from '../Utils/errorHandling.js'
import dotenv from 'dotenv'
import User from '../Models/userModle.js';

dotenv.config();

export const verfiyToken = async(req,res,next)=>{
   const token = req.header('Authorization')
   if(!token)return next(errorHandle(401,'Unauthorized Access'))

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = decode
        const user = await User.findById(req.user._id)
        next()
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Invalied Token Internal Server Error"})
    }
    
}