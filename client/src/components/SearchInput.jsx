import React, { useState } from "react"
import SearchSvg from "../svgs/SearchSvg"
import toast from "react-hot-toast"
import { useConversationContext } from "../context/ConversationContext"
import useGetConversations from "../hooks/useGetConversations"

const SearchInput = () => {
  const [search, setSearch] = useState("")
  const { setSelectedConversation } = useConversationContext()
  const { conversations } = useGetConversations()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    )

    if (conversation) {
      setSelectedConversation(conversation)
      setSearch("")
    } else toast.error("No such user found!")
  }
  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search..."
        className="input !rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn !rounded-full !p-3 !bg-sky-500 border">
        <SearchSvg />
      </button>
    </form>
  )
}

export default SearchInput
