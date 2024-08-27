import { z } from 'zod';
import User from '../models/userModel.js';
import generateOTP from '../utils/generateOTP.js';
import sendOTP from '../services/sendOTP.js';
const forgotvalidation = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email()
})
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
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ username, email });
        if (user) {
            console.log(user);
            return res.status(400).json({ error: "User already exists" });
        }
        const newUser = new User({
            username,
            email,
            password
        });
        await newUser.save();
        return res.status(200).json({ success: "user created Successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Something went Wrong", error })
    }
}
export async function Login(req,res){
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ username, email });
        if (!user) {
            return res.status(400).json({ error: "User Does not exists" });
        }
        return res.status(200).json({ success: "user Login Successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Something went Wrong", error })
    }
}
