import { Link } from "gatsby"
import React from "react"
import { ChevronRight } from "./Icons"

export default function Pager(props) {
  const { previousPagePath, humanPageNumber, nextPagePath } = props
  return (
    <div className="flex items-center justify-between">
      <div className="text-center ">
        <Link
          to={previousPagePath}
          className={`${
            !previousPagePath
              ? "bg-secondary/20 cursor-not-allowed"
              : "hover:bg-secondary/90 hover:shadow-lg bg-secondary"
          } inline-flex items-center px-6 py-3 text-white transition rounded`}
        >
          <ChevronRight className="w-4 h-4 Rotate-180" />
          Previous
        </Link>
      </div>

      <div className="px-6 py-3 transition rounded text-secondary bg-secondary/20">
        {humanPageNumber}
      </div>
      <div className="text-center ">
        <Link
          to={nextPagePath}
          className={`${
            !nextPagePath
              ? "bg-secondary/20 cursor-not-allowed"
              : "hover:bg-secondary/90 hover:shadow-lg bg-secondary"
          } inline-flex items-center px-6 py-3 text-white transition rounded`}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2 " />
        </Link>
      </div>
    </div>
  )
}
