import { createContext, useContext, useState } from "react"

const ConversationContext = createContext()

export const useConversationContext = () => {
    return useContext(ConversationContext)
}

export const ConversationContextProvider = ({ children }) => {
    const [selectedConversation, setSelectedConversation] = useState("")
    const [messages, setMessages] = useState([])

    return (
        <ConversationContext.Provider
            value={{
                selectedConversation,
                setSelectedConversation,
                messages,
                setMessages,
            }}
        >
            {children}
        </ConversationContext.Provider>
    )
}
