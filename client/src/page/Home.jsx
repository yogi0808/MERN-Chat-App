import React from "react"
import SideBare from "../components/SideBare"
import MessageContainer from "../components/MessageContainer"

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] overflow-hidden glass">
      <SideBare />
      <MessageContainer />
    </div>
  )
}

export default Home
