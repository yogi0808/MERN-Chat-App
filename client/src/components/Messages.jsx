import React, { useEffect, useRef } from "react"
import Message from "./Message"
import useGetMessages from "../hooks/useGetMessages"
import LoadingSvg from "../svgs/LoadingSvg"
import useListenMessages from "../hooks/useListenMessages"

const Messages = () => {
  const { loading, messages } = useGetMessages()
  useListenMessages()
  const lastMessageRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [messages])

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div
            className="flex gap-2 justify-end items-end"
            key={message._id}
            ref={lastMessageRef}
          >
            <Message message={message} />
          </div>
        ))}

      {loading && (
        <div className="w-full flex-center">
          <LoadingSvg />
        </div>
      )}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  )
}

export default Messages
