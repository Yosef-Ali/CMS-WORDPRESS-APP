import React from "react";

export default function YouTubLargeSkeleton(props) {
  return (
    <article className="rounded border-2 border-gray-200 border-opacity-60 md:col-span-3 md:h-fit">
      <div className="max-h-lg mx-auto h-full w-full">
        <div className="flex animate-pulse space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="aspect-video w-full rounded bg-gray-400"></div>
            <div className="space-y-2">
              <div className="h-4 rounded bg-gray-400"></div>
              <div className="h-4 w-5/6 rounded bg-gray-400"></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
