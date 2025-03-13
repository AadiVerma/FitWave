import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    ProfilePic: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"]
    },
    age: {
        type: Number,
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },
    trainers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainers'
    }],
    Block: {
        type: Boolean,
        default: false
    },
    addToCart: [{
        type: {
            image: String,
            name: String,
            points: String,
            count: String,
            price: String,
            lastprice: String
        }
    }],
    AIplanPurchases:{
        type:String,
        enum: ["Free", "Premium","Pro"],
        default:"Free"
    },
    CoursePurchases:{
        type:[{
            name : String,
            price : Number,
            image : String,
        }],
        default:[],
    },
    placedOrder: [{
        type: {
            image: String,
            name: String,
            quantity: String,
            price: String,
        }
    }],
    Goals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goals'
    }],
    weight: {
        type: Number,
    },
    height: {
        type: Number,
    },
    daysActive: {
        type: [Date]
    },
    purchases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchase'
    }],
    OTP: {
        type: Number,
        default: null
    }
},
    {
        timestamps: true
    });

const User = mongoose.model('User', userSchema);
export default User;
