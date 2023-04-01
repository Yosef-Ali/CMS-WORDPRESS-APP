import { useState } from "react";

import { getAllEventCalendars } from "../lib/api";

import { ChevronRight } from "./icons";

const getAllFeaturedStories = null;
const getAllNews = null;

// define a component to load more posts
export default function LoadMore({ posts, setPosts, buttonLabel, postType }) {
  const [cursor, setCursor] = useState(posts.pageInfo.endCursor);
  const [hasNextPage, setHasNextPage] = useState(posts.pageInfo.hasNextPage);

  // define a function to fetch more posts based on post type and cursor
  const fetchPosts = async (first = 3, after = null) => {
    // call getAllData function with post type and cursor arguments
    let data = await getAllData(postType, after);

    // declare variables for pageInfo and edges depending on post type
    let pageInfo, edges;
    switch (postType) {
      case "eventCalendars":
        pageInfo = data.events.pageInfo;
        edges = data.events.edges;
        break;
      case "news":
        pageInfo = data.news.pageInfo;
        edges = data.news.edges;
        break;
      case "featuredStory":
        pageInfo = data.featuredStory.pageInfo;
        edges = data.featuredStory.edges;
        break;
      default:
        break;
    }
    // update state variables with new values
    setCursor(pageInfo.endCursor);
    setHasNextPage(pageInfo.hasNextPage);

    // create a new object for updated posts by merging old and new edges
    let updatedPosts = {
      pageInfo: { ...posts.pageInfo, ...pageInfo },
      edges: [...posts.edges, ...edges],
    };

    // update posts state variable with updated posts object
    setPosts(updatedPosts);
  };

  // define a function to get all data based on post type and cursor
  const getAllData = async (postType, after) => {
    let data;

    switch (postType) {
      case "eventCalendars":
        data = await getAllEventCalendars({ after: after });
        break;
      case "news":
        data = await getAllNews({ after: after });
        break;
      case "featuredStory":
        data = await getAllFeaturedStories({ after: after });
        break;
      default:
        break;
    }
    // return data value
    return data;
  };

  // return JSX element for load more button if hasNextPage is true
  return hasNextPage ? (
    <div className="mt-5 ">
      <button
        className="inline-flex items-center rounded bg-secondary px-6 py-3 text-white transition hover:bg-secondary/90 hover:shadow-lg"
        onClick={() => fetchPosts(3, cursor)}
        //onClick={handleClick}
      >
        {buttonLabel}
        <ChevronRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  ) : (
    <p>✅ All posts loaded.</p>
  );
}
