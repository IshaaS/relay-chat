import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsers = async(req,res)=>{
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:userId}}).select("-passwprd");


        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsers: "+error);
        res.status(500).json({error:"server error"});
    }
};

export const getMessages=async(req,res)=>{
    try {
        const {id:userToChat} = req.params;
        const senderId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId:senderId,receiverId:userToChat},
                {senderId:userToChat,receiverId:senderId},
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages: "+error);
        res.status(500).json({error:"server error"});
    }
};

export const sendMessage=async(req,res)=>{
    try {
        const {text, image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
        let imageurl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageurl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageurl,
        });
        await newMessage.save();
        //reatime socket.io (todo)
        res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage: "+error);
        res.status(500).json({error:"server error"});
    }
};