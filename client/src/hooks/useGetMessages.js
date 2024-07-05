import { useEffect, useState } from 'react'
import { useConversationContext } from '../context/ConversationContext'
import toast from 'react-hot-toast'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversationContext()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/messages/${selectedConversation._id}`)

                const data = await response.json()

                if (!response.ok) {
                    toast.error(data.message)
                }

                setMessages(data)
            } catch (e) {
                toast.error(e.message)
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversation?._id) getMessages()
    }, [selectedConversation?._id, setMessages])

    return { messages, loading }
}

export default useGetMessages