import { useState } from "react";

import {
  getAllDailyReadings,
  getAllEventCalendars,
  getAllFeaturedStories,
  getAllItIsTheLORD,
  getAllNews,
  getAllPodcasts,
  getAllTeachings,
  getAllVideoTeachings,
} from "../lib/api";

import { ChevronRight } from "./icons";

// define a component to load more posts
export default function LoadMore({ posts, setPosts, postType, buttonLabel }) {
  //console.log("postType", postType);
  const [cursor, setCursor] = useState(posts.pageInfo.endCursor);
  const [hasNextPage, setHasNextPage] = useState(posts.pageInfo.hasNextPage);

  // define a function to get pageInfo and edges from data based on post type
  const getPageInfoAndEdges = (data, postType) => {
    // Define an object that maps each case to the corresponding data property
    const dataMap = {
      eventCalendars: "events",
      dailyReadings: "posts",
      watchingOurVideos: "posts",
      itIsTheLORD: "posts",
      news: "posts",
      catholicTeachings: "posts",
      featuredStory: "featuredStory",
      podcasts: "podcasts",
    };

    // Get the data property name from the object using the case as a key
    const dataProp = dataMap[postType];

    // If the data property exists, return its pageInfo and edges values
    if (dataProp) {
      return {
        pageInfo: data[dataProp].pageInfo,
        edges: data[dataProp].edges,
      };
    }
  };

  // define a function to fetch more posts based on post type and cursor
  const fetchPosts = async (first = 3, after = null) => {
    let data = await getAllData(postType, after);
    // call getAllData function with post type and cursor arguments

    // declare variables for pageInfo and edges depending on post type
    let { pageInfo, edges } = getPageInfoAndEdges(data, postType);
    // call getPageInfoAndEdges function with data and post type arguments

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
      case "dailyReadings":
        data = await getAllDailyReadings({ after: after });
        break;
      case "watchingOurVideos":
        data = await getAllVideoTeachings({ after: after });
        break;
      case "itIsTheLORD":
        data = await getAllItIsTheLORD({ after: after });
        break;
      case "news":
        data = await getAllNews({ after: after });
        break;
      case "catholicTeachings":
        data = await getAllTeachings({ after: after });
        break;

      case "featuredStory":
        data = await getAllFeaturedStories({ after: after });
        break;
      case "podcasts":
        data = await getAllPodcasts({ after: after });
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
