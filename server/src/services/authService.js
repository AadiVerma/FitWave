import User from "../models/userModel.js";
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import JWTSECRET from '../config/envConfig.js'
const loginvalid = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(100)
})
const loginUser = async (req, res) => {
    const loginvalidation = loginvalid.safeParse(req.body);
    console.log(req.body);
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
export default loginUser;