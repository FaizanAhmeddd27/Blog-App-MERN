import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    token:{
        type: String
    },
    phoneNo: {
        type: Number,
        required: true,
        unique: true,
    },
    photo: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }

    },
    role: {
        type: String,
        enum: ["user", "admin"],
    },
    education: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

})


const User = mongoose.model("User", userSchema);

export default User;