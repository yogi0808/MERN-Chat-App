import React from "react"
import SearchInput from "./SearchInput"
import Conversations from "./Conversations"
import LogoutBtn from "./LogoutBtn"

const SideBare = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col gap-2">
      <SearchInput />
      <div className="divider px-3" />
      <Conversations />
      <LogoutBtn />
    </div>
  )
}

export default SideBare
