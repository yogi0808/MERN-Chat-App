import React from "react"
import { useConversationContext } from "../context/ConversationContext"
import { useSocketContext } from "../context/SocketContext"

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } =
    useConversationContext()

  const isSelected = selectedConversation?._id === conversation._id

  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="aspect-square size-12 rounded-full flex-center relative">
          <img
            src={conversation.profilePic}
            alt="User Image"
            className="w-full h-full"
          />
          {isOnline && (
            <div className="size-3 rounded-full bg-[--online] border-[2px] border-[--offline] absolute top-0 right-0" />
          )}
        </div>
        <div className="flex flex-1">
          <p className="font-bold text-gray-200 line-clamp-1">
            {conversation.fullName}
          </p>
        </div>
      </div>
      {lastIdx ? "" : <div className="divider px-3" />}
    </>
  )
}

export default Conversation
