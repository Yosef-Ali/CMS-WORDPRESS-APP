import React from "react"

export default function Mass(props) {
  const { parishs: parish } = props
  console.log("propsM", props)
  return (
    <div className="flex flex-col mb-10 lg:items-start">
      <div className="inline-flex items-center justify-center w-12 h-12 mb-5 rounded-full text-black/70 bg-black/10">
        <MassIcon />
      </div>
      <div className="flex-grow">
        <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
          <span className="mr-4">Mass:</span>
          {parish.mass}
        </h2>
        <div className="flex">
          <div className="inline-flex items-center justify-center mb-4 rounded-full w-7 h-7 text-black/70 bg-black/10">
            <TimeIcon />
          </div>

          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">Week Days: </span>
            {parish.weekDays}
          </span>
        </div>

        <div className="flex">
          <div className="inline-flex items-center justify-center mb-5 rounded-full w-7 h-7 text-black/70 bg-black/10">
            <TimeIcon />
          </div>
          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">Sun Day: </span>
            {parish.sunDay}
          </span>
        </div>
      </div>
    </div>
  )
}

function MassIcon() {
  return (
    <svg width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.655 2.206v.551H21.49v-.551H3.655Zm-2.778.551H1.9V0h21.345v2.757h.878c.484 0 .877.494.877 1.103 0 .61-.393 1.103-.877 1.103h-.878v.276c0 6.942-4.34 12.609-9.795 12.944v.935h.878c.484 0 .877.494.877 1.103 0 .61-.393 1.103-.877 1.103h-.878v1.47h3.802c.484 0 .877.494.877 1.103 0 .61-.393 1.103-.878 1.103H7.75c-.485 0-.878-.494-.878-1.103s.393-1.103.878-1.103h3.947v-1.47h-.877c-.485 0-.877-.494-.877-1.103 0-.61.392-1.103.877-1.103h.877v-.935C6.241 17.848 1.9 12.181 1.9 5.24v-.276H.877C.393 4.963 0 4.469 0 3.86c0-.61.393-1.103.877-1.103Zm20.614 2.482v-.276H3.655v.276c0 5.94 3.829 10.754 8.553 10.754h.73c4.724 0 8.553-4.815 8.553-10.754Zm-8.918 8.916c-.484 0-.877-.493-.877-1.103V10.11h-.877c-.485 0-.877-.494-.877-1.103 0-.61.392-1.103.877-1.103h.877v-.55c0-.61.393-1.103.877-1.103.485 0 .877.494.877 1.103v.55h.878c.484 0 .877.494.877 1.103 0 .61-.393 1.103-.877 1.103h-.878v2.942c0 .61-.392 1.103-.877 1.103Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TimeIcon() {
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
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}
