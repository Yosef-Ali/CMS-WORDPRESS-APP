import { Link } from "gatsby";
import React from "react";
import { ChevronRight } from "./Icons";

export default function Pager(props) {
  const { previousPagePath, humanPageNumber, nextPagePath } = props;
  return (
    <div className="flex items-center justify-between">
      <div className="text-center ">
        <Link
          to={previousPagePath}
          className={`${
            !previousPagePath
              ? "cursor-not-allowed bg-secondary/20"
              : "bg-secondary hover:bg-secondary/90 hover:shadow-lg"
          } inline-flex items-center rounded px-6 py-3 text-white transition`}
        >
          <ChevronRight className="Rotate-180 h-4 w-4" />
          Previous
        </Link>
      </div>

      <div className="rounded bg-secondary/20 px-6 py-3 text-secondary transition">
        {humanPageNumber}
      </div>
      <div className="text-center ">
        <Link
          to={nextPagePath}
          className={`${
            !nextPagePath
              ? "cursor-not-allowed bg-secondary/20"
              : "bg-secondary hover:bg-secondary/90 hover:shadow-lg"
          } inline-flex items-center rounded px-6 py-3 text-white transition`}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4 " />
        </Link>
      </div>
    </div>
  );
}
