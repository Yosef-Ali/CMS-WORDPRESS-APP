import React from "react";
import { Link } from "gatsby";
import ChevronRight from "./chevron-right";

function PostsList(props) {
  const ReadMoreLink = `${props.readMoreLink}${props.databaseId}`;
  return (
    <div className="pt-6">
      <div className="text-md title-font font-noto font-medium text-gray-900 line-clamp-3">
        <p>{props.title}</p>
      </div>
      <Link
        to={ReadMoreLink}
        className="mt-4 inline-flex items-center text-indigo-500 "
      >
        Read More
        <ChevronRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}

export default function SideWidget({ posts, title, readMoreLink, moreUrl }) {
  return (
    <div className="mb-8 w-full md:px-2 lg:p-4">
      <div className="h-full border-b-16 border-black/10 bg-blue-100/80 p-8 text-center shadow-sm">
        <div className="p-3">
          <h1 className="title-font text-2xl font-medium text-gray-900">
            {title}
          </h1>
        </div>
        <div className="space-y-6 divide-y divide-black/10">
          {posts?.slice(0, 3).map((list) => (
            <PostsList
              {...list}
              key={list.databaseId}
              readMoreLink={readMoreLink}
            />
          ))}
          <div className="pt-6">
            <Link
              to={`${moreUrl}`}
              className="inline-flex items-center rounded bg-secondary px-6 py-3 text-white hover:bg-secondary/90 hover:shadow-lg"
            >
              View More
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
