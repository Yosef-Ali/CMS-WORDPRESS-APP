import React from "react"

export default function YouTubLargeSkeleton(props) {
  return (
    <article
      href="!#"
      className="border-2 border-gray-200 rounded md:col-span-3 border-opacity-60 md:h-fit"
    >
      <div className="w-full h-full mx-auto max-h-lg">
        <div className="flex space-x-4 animate-pulse">
          <div className="flex-1 py-1 space-y-4">
            <div className="w-full bg-gray-400 rounded aspect-video"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-400 rounded"></div>
              <div className="w-5/6 h-4 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
