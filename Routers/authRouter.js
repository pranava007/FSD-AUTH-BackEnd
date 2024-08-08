import express from "express";
import { restPassword , forgetPassword, login, register } from "../Controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/forget-password',forgetPassword);
authRouter.post('/reset-password/:id/:token',restPassword);


export default authRouter;