import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    profilePicture:{
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',

    }, 
    verified: {
        type: Boolean,
        default: false
    },
    weight: {
        type: Number,
    },
    height: {
        type: Number,
    },
    goal: {
        type: String,
        enum: ["cut", "maintain", "bulk"],
        default: "maintain"
    },
    goalWeight: {
        type: Number,
        default: false
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male"
    },
    age: {
        type: Number,
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema); // Removed extra semicolon

export default User;
