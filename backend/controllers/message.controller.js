import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res)=>{
    try {
        
        const {message} = req.body;
        const {id:receiverId} = req.params; //id:receiverId changes variable name from id to receiverId
        const senderId = req.user._id;
        console.log(receiverId);
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save();
        // await newMessage.save();
        //the above comment can be converted to the statement below
        await Promise.all([conversation.save(),  newMessage.save()]); //It will mmake both of them run in parallel

        const receiverSocketId = getRecieverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in SendMessage controller: ",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]},
        }).populate("messages");//gives message one by one instead of array(Not reference but actual messages)
        if(!conversation){
            return res.status(200).json([]);
        }
        const messages = conversation.messages;
        if(!messages){
            return res.status(400).json({error: "No message"});
        }
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}