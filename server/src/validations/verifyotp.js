import express from 'express';
import sessionConfig from '../config/sessionConfig.js';
const app = express();
app.use(express.json());
app.use(sessionConfig);
app.get('/',(req,res)=>{
    const {otp}=req.body;
    if(!otp){
        return res.status(400).json({error:"OTP is required"});
    }
    if(req.session.otp==otp){
        return res.json({msg:"OTP verified successfully"});
    }
    return res.status(401).json({error:"Invalid OTP"});
})
export default app;