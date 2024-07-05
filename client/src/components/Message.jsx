import React from "react"
import TipSvg from "../svgs/TipSvg"
import { useAuthContext } from "../context/AuthContext"
import { useConversationContext } from "../context/ConversationContext"
import { extractTime } from "../utils/extractTime"

const Message = ({ message }) => {
  const { authUser } = useAuthContext()
  const { selectedConversation } = useConversationContext()
  const fromMe = message.senderId === authUser._id
  const shake = message.shouldShake ? "shake" : ""

  return fromMe ? (
    <>
      <div className="w-full flex flex-col items-end">
        <div className="flex-center py-1.5 w-fit max-w-[70%] px-2 bg-sky-500 text-white rounded-t-xl rounded-bl-xl relative">
          <TipSvg
            cClassis="absolute left-[calc(100%-1px)] bottom-0 flip"
            fill="#0ea5e9"
          />
          <p>{message.message}</p>
        </div>
        <p className="text-sm text-white pb-2">
          {extractTime(message.createdAt)}
        </p>
      </div>
      <div className="aspect-square size-10 rounded-full flex-center mb-7">
        <img
          src={authUser.profilePic}
          alt="user image"
        />
      </div>
    </>
  ) : (
    <>
      <div className="aspect-square size-10 rounded-full flex-center mb-7">
        <img
          src={selectedConversation.profilePic}
          alt="user image"
        />
      </div>
      <div className="w-full">
        <div
          className={`flex-center py-1.5 w-fit max-w-[70%] px-2 bg-[--start-ms-bg] text-white rounded-t-xl rounded-br-xl relative ${shake}`}
        >
          <TipSvg
            cClassis="absolute right-[calc(100%-1px)] bottom-0"
            fill="#2a323c"
          />
          <p>{message.message}</p>
        </div>
        <p className="text-sm text-white pb-2">
          {extractTime(message.createdAt)}
        </p>
      </div>
    </>
  )
}

export default Message
