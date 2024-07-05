import { useState } from 'react'
import { useConversationContext } from '../context/ConversationContext'
import toast from "react-hot-toast"

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversationContext()

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            })

            const data = await response.json()

            if (!response.ok) {
                toast.error(data.message)
            }

            setMessages([...messages, data])
        } catch (e) {
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, sendMessage }
}

export default useSendMessage