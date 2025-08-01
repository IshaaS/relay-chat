import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required: true,
            unique: true,
        },
        fullname:{
            type:String,
            required: true,
        },
        password:{
            type:String,
            required: true,
            minlength: 6,
        },
        profilePic:{
            type:String,
            default: "",
        },
        about:{
            type:String,
            default: "Hi, I am using Ping Me"
        }
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
export default User;