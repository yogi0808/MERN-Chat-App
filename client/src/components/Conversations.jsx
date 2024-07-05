import React from "react"
import Conversation from "./Conversation"
import useGetConversations from "../hooks/useGetConversations"
import LoadingSvg from "../svgs/LoadingSvg"

const Conversations = () => {
  const { loading, conversations } = useGetConversations()

  return (
    <div className="py-2 flex flex-col overflow-auto gap-2 flex-1">
      {conversations.map((item, idx) => (
        <Conversation
          key={item._id}
          conversation={item}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? <LoadingSvg /> : null}
    </div>
  )
}

export default Conversations
