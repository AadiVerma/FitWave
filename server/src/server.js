import express from 'express';
import userModel from './models/userModel.js';
import mongoose from 'mongoose';
import User from './models/userModel.js';
import DBConnect from './config/dbConfig.js';
import dbURI from "./config/envConfig.js"
import loginUser from './services/authService.js';
import otpsending from './validations/emailvalidations.js'
import verifyotp from './validations/verifyotp.js'
DBConnect(dbURI.dbURI);
const app=express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.json({msg:"Hello World"});
})
app.use('/email',otpsending);
app.use('/verifyotp',verifyotp);
app.post('/users',async (req,res)=>{
    // console.log(req.body);
    await loginUser.signupUser(req,res);
})
app.get('/users',async (req,res)=>{
    // console.log(req.body);
    await loginUser.loginUser(req,res);
})
app.listen(3000,()=>{
    console.log("listening on 3000");
})