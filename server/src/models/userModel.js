import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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
        required: true
    },
    trainers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainers'
    }],
    Goals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goals'
    }],
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    daysActive: {
        type: [Date]
    },
    purchases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchase'
    }]
},
    {
        timestamps: true 
    });

const User = mongoose.model('User', userSchema);
export default User;
