import express from 'express';
import User from '../models/userModel.js';
import sendOTP from '../services/sendOTP.js';
import z from 'zod';
import generateOTP from '../utils/generateOTP.js';
import sessionConfig from '../config/sessionConfig.js';
const app=express();
app.use(express.json());
app.use(sessionConfig)
const emailvalidate=z.object({
    email:z.string().email()
})
function storeotp(req,otp){
    if(req.session && req.session.otp){
        delete req.session.otp;
    }
    if(req.sesssion && req.session.otpExpiresAt){
        delete req.session.otpExpiresAt;
    }
    req.session.otp = otp;
    req.session.otpExpiresAt = Date.now() + 5 * 60 * 1000;}
app.post('/',async (req,res)=>{
    const validate=emailvalidate.safeParse(req.body);
    if(!validate.success){
        return res.status(400).json({ error: "Invalid input" });
    }
    const {email} =req.body;
    console.log(email);
    const user = await User.findOne({email:email});
    if (!user) {
        return res.status(401).json({ error: "user does not exists"});
    }
    else{
        const otp = generateOTP();
        storeotp(req,otp);
        sendOTP({email:email,otp:otp});
        res.status(200).json({ message: "email sent successfully" });
    }
})
export default app;