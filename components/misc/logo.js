import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const logo = ({ color }) => {
  return (
    <div className="flex items-end space-x-3 ">
      <StaticImage src="../../images/logo.png" width={40} alt="logo" />
      <div className="">
        <p
          className={
            " mb-0 text-md  text-left font-noto lg:text-base " +
            (color === "white" ? " text-gray-100" : " text-primary")
          }
        >
          አዲስ አበባ ካቶሊክ ሀገረ ስብከት
        </p>
        <p className="mb-0 font-sans text-md lg:text-base ">
          The Archdioceses of Addis Ababa
        </p>
      </div>
    </div>
  )
}

export default logo
