import React from "react"

const ButtonOutline = ({ children }) => {
  return (
    <button className="px-5 py-2 font-medium tracking-wide text-orange-500 capitalize transition-all border border-orange-500 outline-none sm:px-8 bg-white-500 hover:bg-orange-500 hover:text-white ">
      {" "}
      {children}
    </button>
  )
}

export default ButtonOutline
