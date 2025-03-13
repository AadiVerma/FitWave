import { z } from 'zod';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateOTP from '../utils/generateOTP.js';
import sendOTP from '../services/sendOTP.js';
import jwt from 'jsonwebtoken';
import JWTSECRET from '../config/envConfig.js';
import sendEmail from '../services/sendmails.js';
import UserInteract from '../models/userInteractions.js';
const saltrounds = 10;
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
    role: z.string().optional()
});
const validateProfile = z.object({
    height: z.number().min(0, "Height must be a positive number."),
    weight: z.number().min(0, "Weight must be a positive number."),
    age: z.number().int().min(0, "Age must be a positive integer."),
    gender: z.enum(["Male", "Female", "Others"]),
    image: z.string(),
    email: z.string().email()
});
const validatepassword = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
    confirm: z.string().min(8).max(100)
})
async function storeotp(req, otp) {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    user.OTP = otp;
    await user.save();
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
    const { email } = req.body;
    try {
        if (!otp) {
            return res.status(400).json({ error: "OTP is required" });
        }
        const userotp = await User.findOne({ email: email });
        if (userotp.OTP == otp) {
            userotp.OTP = null;
            await userotp.save();
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
    const { username, email, password, role } = req.body;
    try {
        const user = await User.findOne({ username: username, password: password });
        if (user) {
            return res.status(401).json({ error: "user already exists" });
        }
        const newuser = new User({
            username,
            password,
            email,
            role: role ? role : "User"
        })
        const salt = await bcrypt.genSalt(saltrounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        newuser.password = hashedPassword;
        await newuser.save();
        const token = jwt.sign({ username: username, role: role }, JWTSECRET.JWTSECRET, { expiresIn: '1h' });
        // res.cookie("JWTTOKEN", token, {
        //     maxAge: 24 * 60 * 60 * 1000,
        //     httpOnly: true,
        // })
        sendEmail({ email: email });
        return res.status(200).json({ message: "SignUp successful", token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export async function Login(req, res) {
    const loginvalidation = loginvalid.safeParse(req.body);
    if (!loginvalidation.success) {
        return res.status(400).json({ error: "Invalid input" });
    }
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Wrong Password" });
        }
        if (user.Block) {
            return res.status(401).json({ error: "You Are blocked to Access Our Services" });
        }
        const token = jwt.sign({ user: user.username, role: user.role }, JWTSECRET.JWTSECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: "Login successful", token: token, username: user.username, profilePic: user.ProfilePic });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export async function ChangePassword(req, res) {
    const validate = validatepassword.safeParse(req.body);
    if (!validate) {
        return res.status(400).json({ error: "Invalid input" });
    }
    try {
        const { email, password, confirm } = req.body;
        if (password !== confirm) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const salt = await bcrypt.genSalt(saltrounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ msg: "Password updated successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.message });
    }
}
export async function Profile(req, res) {
    const validate = validateProfile.safeParse(req.body);
    if (!validate.success) {
        console.log(req.body);
        return res.status(400).json({ error: "Invalid input" });
    }
    try {
        const email = req.body.email;
        const { height, weight, age, gender, image } = req.body;
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).send({ error: "User does not exist" });
            }
            user.height = height;
            user.weight = weight;
            user.age = age;
            user.gender = gender;
            user.ProfilePic = image;
            await user.save();
        } catch (error) {
            return res.status(401).send({ error: "Invalid Token" });
        }
        console.log(req.body);
        return res.status(200).send("success");
    } catch (error) {
        return res.status(400).send(error);
    }
}

export async function getUserProfile(req, res) {
    const { username } = req.params;
    console.log(username);
    try {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).send({ error: "User does not exist" });
            }
            return res.status(200).send({
                username: user.username,
                profilePic: user.ProfilePic,
                email: user.email,
                gender: user.gender,
                age: user.age,
                height: user.height,
                weight: user.weight,
            });
        } catch (error) {
            return res.status(401).send({ error: "Invalid Username" });
        }
    } catch (error) {
        return res.status(400).send(error);
    }
}
export async function getalluserinteractions(req, res) {   
    try {
        const user = await UserInteract.find({});
        if (!user) {
            return res.status(400).send({ error: "User does not exist" });
        }
        return res.status(200).send({
            userinteract: user[0].userInteractions
        });
    } catch (error) {
        return res.status(401).send({ error: "Invalid Username" });
    }
}
export async function AddToCart(req, res) {
    const { image, name, points, count, price, lastprice, username } = req.body;
    console.log(req.body);
    try {
        const user1 = await User.findOne({ username });
        if (!user1) {
            return res.status(400).send("user not found");
        }
        user1.addToCart.push({
            image: image,
            name: name,
            points: points,
            count: count,
            price: price,
            lastprice: lastprice,
        })
        console.log(user1.addToCart);
        await user1.save();
        return res.status(200).send(user1);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}
export async function GetAddToCart(req, res) {
    const { username } = req.params;
    try {
        const user1 = await User.findOne({ username });
        if (!user1) {
            return res.status(400).send("user not found");
        }
        return res.status(200).send(user1.addToCart);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}
export async function removeFromCart(req, res) {
    const { username, name } = req.body;
    console.log(username, name);
    try {
        const user1 = await User.findOne({ username });
        if (!user1) {
            return res.status(400).send("user not found");
        }
        user1.addToCart = user1.addToCart.filter(item => !name.includes(item.name));
        await user1.save();
        return res.status(200).send(user1.addToCart);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}
export async function getuserpurchases(req, res) {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send("user not found");
        }
        return res.status(200).send(user.placedOrder);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}
export async function AddInteract(req, res) {
    try {
        let globalInteractions = await UserInteract.findOne({});

        if (!globalInteractions) {
            globalInteractions = new UserInteract();
            await globalInteractions.save();
        }

        globalInteractions.userInteractions += 1;

        await globalInteractions.save();
        return res.status(200).send("success");
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}
export async function dayActive(req, res) {
    const currentDate = new Date();
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).send("user not found");
    }
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const isDateAlreadyLogged = user.daysActive.some(date => {
        return (
            date.getFullYear() === currentYear &&
            date.getMonth() === currentMonth &&
            date.getDate() === currentDay
        );
    });
    if (!isDateAlreadyLogged) {
        user.daysActive.push(currentDate);
        await user.save();
    }

    const days = user.daysActive;
    return res.status(200).send(days);
}
export async function getUserdata(req, res) {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send("user not found");
        }
        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}
export async function getallusersdata(req, res) {
    try {
        const users = await User.find({});
        const filtereduser = users.filter(user => user.role !== "Admin")
        return res.status(200).send(filtereduser);
    } catch (error) {
        return res.status(400).send("user not found");
    }
}
export async function updateuser(req, res) {
    const { userId } = req.body;
    try {
        const user = await User.findOne({ _id: userId });
        if (user.Block) {
            user.Block = false;
        }
        else {
            user.Block = true;
        }
        await user.save();
        return res.status(200).send(user);
    } catch (error) {
        return res.status(400).send("user not found");
    }
}
export async function PlaceOrder(req, res) {
    const username = req.params.username
    const { data } = req.body;
    try {
        const user1 = await User.findOne({ username });
        if (!user1) {
            return res.status(400).send("user not found");
        }
        data.map((d) => {
            user1.placedOrder.push({
                image: d.image,
                name: d.name,
                quantity: d.quantity,
                price: d.price,
            })
        })
        await user1.save();
        return res.status(200).send(user1);
    } catch (error) {
        return res.status(400).send(error);
    }
}
export async function getAIplanPurchases(req,res){
    const username = req.params.username;
    try {
        const user1 = await User.findOne({ username });
        if (!user1) {
            return res.status(400).send("user not found");
        }
        return res.status(200).send(user1.AIplanPurchases);
    } catch (error) {
        return res.status(400).send(error);
    }
}
export async function addAIplanPurchases(req,res){
    const username = req.params.username;
    const {data} =  req.body;
    try {
        const user1 = await User.findOne({ username });
        if (!user1) {
            return res.status(400).send("user not found");
        }
        user1.AIplanPurchases=data.name;
        await  user1.save();
        return res.status(200).send(user1.AIplanPurchases);
    } catch (error) {
        return res.status(400).send(error);
    }
}
export async function purchasecourse(req, res) {
    const username = req.params.username
    const { data } = req.body;
    try {
        const user1 = await User.findOne({ username });
        if (!user1) {
            return res.status(400).send("user not found");
        }
            user1.CoursePurchases.push({
                image: data[0].image,
                name: data[0].name,
                price: data[0].price,
            })
        await user1.save();
        return res.status(200).send(user1);
    } catch (error) {
        return res.status(400).send(error);
    }
}