import User from "../models/userModel.js";
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import JWTSECRET from '../config/envConfig.js'
import trainers from "../models/Trainer.js";
const loginvalid = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(100)
})
const signupValidate = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(3).max(20),
    gender: z.enum(["Male", "Female", "Others"]),
    age: z.number(),
    weight: z.number(),
    height: z.number(),
});
const loginUser = async (req, res) => {
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
            httpOnly: true,
        })
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const signupUser = async (req, res) => {
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
            gender,
            age,
            height,
            weight
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
export default { loginUser, signupUser };