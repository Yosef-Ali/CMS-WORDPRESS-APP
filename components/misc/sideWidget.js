import React from "react"
import { Link } from "gatsby"
import ChevronRight from "./chevron-right"

function PostsList(props) {
  const ReadMoreLink = `${props.readMoreLink}${props.databaseId}`
  return (
    <div className="pt-6">
      <div className="font-medium text-gray-900 text-md title-font font-noto line-clamp-3">
        <p>{props.title}</p>
      </div>
      <Link
        to={ReadMoreLink}
        className="inline-flex items-center mt-4 text-indigo-500 "
      >
        Read More
        <ChevronRight className="w-4 h-4 ml-2" />
      </Link>
    </div>
  )
}

export default function SideWidget({ posts, title, readMoreLink, moreUrl }) {
  return (
    <div className="w-full mb-8 lg:p-4 md:px-2">
      <div className="h-full p-8 text-center shadow-sm border-b-16 border-black/10 bg-blue-100/80">
        <div className="p-3">
          <h1 className="text-2xl font-medium text-gray-900 title-font">
            {title}
          </h1>
        </div>
        <div className="space-y-6 divide-y divide-black/10">
          {posts?.slice(0, 3).map(list => (
            <PostsList
              {...list}
              key={list.databaseId}
              readMoreLink={readMoreLink}
            />
          ))}
          <div className="pt-6">
            <Link
              to={`${moreUrl}`}
              className="inline-flex items-center px-6 py-3 text-white rounded bg-secondary hover:bg-secondary/90 hover:shadow-lg"
            >
              View More
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
