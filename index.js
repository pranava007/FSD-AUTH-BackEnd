import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./Database/config.js";
import authRouter from "./Routers/authRouter.js";


dotenv.config()
const app = express()

//middlewares
app.use(express.json())
app.use(cors({
    origin:"*",
    credentials:true
}))

// Error Handling Middleware
app.use((err ,req,res,next)=>{
    const statusCode = err.statusCode || 500
    res.statusCode(statusCode).json({success:false,message:err.message || "Internal Server Error"})
})

// DB connection
connectDB()

//Defult routers
app.get('/',(req,res)=>{
   res.status(200).send("Hi Welcome to Auth API")
})

// Auth Router
app.use('/api/auth',authRouter)
//litener
app.listen(process.env.PORT,()=>{
    console.log("App is started And running on the port");
    
})