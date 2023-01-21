import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import PriestIcon from "../../images/priest.png"

export default function PriestProfile(props) {
  const { priestName, priestEmail, priestPhone } = props.parishs
  const image = getImage(props.parishs.priestImage?.localFile)

  return (
    <div className="flex flex-col mt-10 mb-10 lg:items-start">
      <div className="inline-flex items-center justify-center w-12 h-12 mb-5 bg-indigo-100 rounded-full">
        {image ? (
          <GatsbyImage
            image={image}
            alt={""}
            className="object-cover object-center w-12 h-12 rounded-full"
          />
        ) : (
          <img
            src={PriestIcon}
            alt="Priest icon"
            className="w-12 h-12 rounded-full "
          />
        )}
      </div>
      <div className="flex-grow">
        <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
          {priestName}
        </h2>
        <div className="flex">
          <div className="inline-flex items-center justify-center mb-5 rounded-full w-7 h-7 text-black/70 bg-black/10">
            <PhoneIcon />
          </div>
          <span className="ml-2 text-base leading-relaxed">{priestPhone}</span>
          <div className="flex ml-4 ">
            <div className="inline-flex items-center justify-center mb-5 rounded-full w-7 h-7 text-black/70 bg-black/10">
              <EmailIcon />
            </div>
            <span className="ml-2 text-base leading-relaxed">
              {priestEmail}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="inline-block w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  )
}
