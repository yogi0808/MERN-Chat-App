import Conversation from "../models/conversation-model.js"
import Message from "../models/message-model.js"
import { getReceiversSocketId, io } from "../socket/socket.js"

export const getMessages = async (req, res) => {
    try {

        const { id: userToChatId } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages")

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (e) {
        console.log("Error in getMessages controller: ", e.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessages = async (req, res) => {
    try {

        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()])


        const receiverSocketId = getReceiversSocketId(receiverId)

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)

    } catch (e) {
        console.log("Error in sendMessage controller: ", e.message);
        res.status(500).json({ message: "Internal server error" });
    }
}