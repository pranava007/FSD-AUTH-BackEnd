import User from '../Models/userModle.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { errorHandle } from '../Utils/errorHandling.js'
import nodemailer from "nodemailer";
// import { sendPasswordResetEmail } from '../Services/nodemailers.js'


dotenv.config()
// SignUp Logic 
export const register = async (req,res,next)=>{

    try {
        // client said req
        const {username,email,password} = req.body
        // field empty 
        if(!username || !email || !password || username === " " || email === " " || password === " ") return next(errorHandle(400,'All The Fields Are Required'))
        // password hash
        const hashpassword = await bcryptjs.hashSync(password,10)
        // object create 
        const newUser = new User({username,email,password:hashpassword})
        // DB stroge data
        await newUser.save()
        res.status(200).json({message:"User Registered Successfully",result:newUser})
        
        
        
    } catch (error) {
        next(error) 
    }

}

// SignIn Logic

export const login = async (req,res,next)=>{

    try {
        //client said data get
        const {email,password} = req.body
        //email check get DB all data
        const user = await User.findOne({email})
        // email validation
        if(!user) return res.status(404).json({message:"Invalid Email"})
        // compare passwords
        const userpasswords = bcryptjs.compareSync(password,user.password)
        // passwords validation
        if(!userpasswords)return res.status(404).json({message:"Invalid Password"})
        
        // Token gentrated autharaized
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
        // sent to cliend
        res.status(200).json({message:"User LoggedIn Successfully",token})

    } catch (error) {
        next(error);
    }
}

// Forget Password

export const forgetPassword = async(req,res)=>{
  //Client said data
  const {email} = req.body
  // get email for db 
  const user = await User.findOne({email})
  // email validation
  if(!user) return res.status(404).json({message:"User Not Found"})
  // gentrate token 
  const token = jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})

  var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:process.env.PASSMAIL,
      pass:process.env.PASSKEY,
    }
  })

  var mailOptions = {
    from: process.env.PASSMAIL,
    to:user.email,
    subject:"Password Reset",
    text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
    "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
    `https://glittering-taffy-8bc914.netlify.app/resetpassword/${user._id}/${token}`
    // this url frontend url for reset
  }

  transporter.sendMail(mailOptions,function(error,info){
    if(error){
      console.log(error);
      res.status(500).json({message:"Internal server error in sending the mail"});
    }
    else{
      res.status(200).json({message:"Email sent successfully "})
    }
  })


  
}

// Rest Password

export const restPassword = async(req,res)=>{
  const {id,token} = req.params
  const {password} = req.body
  jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
    if(err){
      return res.status(401).json({message:"Invalid token"})
    }
    else{
      bcryptjs.hash(password,10)
      .then(hash=>{
        User.findByIdAndUpdate({_id:id},{password:hash})
        .then(ele=>res.send({status:"Success"}))
        .catch(err=>res.send({status:err}))
      })
      .catch(err=>res.send({status:err}))
    }
  })
}