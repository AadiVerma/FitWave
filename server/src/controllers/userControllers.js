import { z } from 'zod';
import User from '../models/userModel.js';
import generateOTP from '../utils/generateOTP.js';
import sendOTP from '../services/sendOTP.js';
import jwt from 'jsonwebtoken';
import JWTSECRET from '../config/envConfig.js'
const forgotvalidation = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email()
})
const loginvalid = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(100)
})
const signupValidate = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(3).max(20),
});
function storeotp(req, otp) {
    req.session.otp = otp;
    req.session.otpExpiresAt = Date.now() + 5 * 60 * 1000;
}
export async function ForgotPassword(req, res) {
    const validation = forgotvalidation.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).send({ error: "Send UserName and Password Correctly" })
    }
    const { email, username } = req.body;
    try {
        const user = await User.findOne({ email: email, username: username });
        if (!user) {
            return res.status(400).send({ error: "User does not exist" });
        }
        const otp = generateOTP();
        storeotp(req, otp);
        sendOTP({ email: email, otp: otp });
        res.status(200).json({ message: "email sent successfully" });
    } catch (error) {
        return res.status(400).send({ error: "Internal Server Error" });
    }

}
export async function VerifyOTP(req, res) {
    const { otp } = req.body;
    try {
        if (!otp) {
            return res.status(400).json({ error: "OTP is required" });
        }
        if (req.session.otp == otp) {
            return res.json({ msg: "OTP verified successfully" });
        }
        return res.status(400).json({ error: "error", error })
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: error });
    }

}
export async function SignUp(req, res) {
    const signvalid = signupValidate.safeParse(req.body);
    if (!signvalid.success) {
        return res.status(400).json({ error: "Invalid input" });
    }
    const { username, email, password, gender, age, weight, height } = req.body;
    try {
        const user = await User.findOne({ username: username, password: password });
        if (user) {
            return res.status(401).json({ error: "user already exists" });
        }
        const newuser = new User({
            username,
            password,
            email,
        })
        await newuser.save();
        const token = jwt.sign({ id: newuser._id }, JWTSECRET.JWTSECRET, { expiresIn: '1h' });
        res.cookie("JWTTOKEN", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
        return res.status(200).json({ message: "SignUp successful", token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export async function  Login(req, res){
    const loginvalidation = loginvalid.safeParse(req.body);
    if (!loginvalidation.success) {
        return res.status(400).json({ error: "Invalid input" });
    }
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username, password: password });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const token = jwt.sign({ id: user._id }, JWTSECRET.JWTSECRET, { expiresIn: '1h' });
        res.cookie("JWTTOKEN", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
        })
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
