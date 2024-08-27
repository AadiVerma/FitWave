import express from 'express';
import userModel from './models/userModel.js';
import mongoose from 'mongoose';
import User from './models/userModel.js';
import DBConnect from './config/dbConfig.js';
import dbURI from "./config/envConfig.js"
import loginUser from './services/authService.js';
import otpsending from './validations/emailvalidations.js'
import verifyotp from './validations/verifyotp.js'
import loginData from './validations/loginData.js';

DBConnect(dbURI.dbURI);
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.json({ msg: "Hello World" });
})
app.use('/email', otpsending);
app.use('/verifyotp', verifyotp);

app.use('/api/email', loginData);

app.post('/users', async (req, res) => {
    await loginUser.signupUser(req, res);
})
app.get('/users', async (req, res) => {
    await loginUser.loginUser(req, res);
})
app.listen(3000, () => {
    console.log("listening on 3000");
})