import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {fullname, email, password} = req.body;
    try {
        if(!email || !password || !fullname){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length<6){
            return res.status(400).json({message: "Password must be atleast 6 characters long"});
        }
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: "User already exists"});

        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            fullname,
            email,
            password:hashedPassword,
        })
        if(newUser){
            //generate jwt token
            generateToken(newUser._id,res);
            await newUser.save();
            return res.status(201).json({_id:newUser._id, 
                fullname:newUser.fullname,
                email:newUser.email,
                profilePic: newUser.profilePic,
                about: newUser.about,
            });
        }else{
            return res.status(400).json({message: "Invalid data"});
        }

    } catch (error) {
        console.log("Error in signup controller:"+ error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

export const login = async(req, res)=>{
   const {email, password} = req.body;
   try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid login creds"});
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid login creds"});
        }
        generateToken(user._id, res);
        res.status(200).json(user)

   } catch (error) {
        console.log("Error in login controller:"+ error.message);
        res.status(500).json({message: "Internal server error"});
   }
};

export const logout = (req, res)=>{
   try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({message: "Logged out successfully"});
   } catch (error) {
        console.log("Error in logout controller:"+ error.message);
        res.status(500).json({message: "Internal server error"});
   }
};

export const updateProfile = async(req,res)=>{
    try {
        const { profilePic, about } = req.body;
        const userId=req.user._id;
        const updateData = {};
        if(profilePic){
            const uploadResponse = await cloudinary.uploader.upload(profilePic);
            updateData.profilePic = uploadResponse.secure_url;
        }
        if (about) {
            updateData.about = about;
        }
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "Nothing to update" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );
        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("Error in updateprofile controller:"+ error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

export const checkAuth = (req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller:"+ error.message);
        res.status(500).json({message: "Internal server error"});
    }
};