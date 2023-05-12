// Import the necessary React and NextJS libraries
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";

// Import the Banner, CTA, Layout, and EventCalendar components
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import Layout from "../../components/layout";
import EventCalendar from "../../components/event-calendars";

// Import the ArticlesPostListSkeleton component
import ArticlesPostListSkeleton from "../../components/skeleton/articles-post-skeleton";

// Import the getAllItIsTheLORD and getAllVideoTeachings functions from the lib/api file
import { getAllItIsTheLORD, getAllVideoTeachings } from "../../lib/api";

// Create a dynamic component for the ArticlesPostList component
const ArticlesPostList = dynamic(
  () => import("../../components/articles-post"),
  {
    ssr: false,
  }
);

// Set the after variable to null
const after = null;

// Export the default function
export default function WatchingOurVideos({
  itIsTheLORD,
  catholicTeachings,
  events,
  audios,
}) {
  // Create a state variable for the posts and set it to the itIsTheLORD data
  const [posts, setPosts] = useState(itIsTheLORD);

  // Create a state variable for the loading status and set it to true
  const [loading, setLoading] = useState(true);

  // Get the catholicTeachingsPosts, eventsPosts, and audioTracks data
  const catholicTeachingsPosts = catholicTeachings?.edges;
  const eventsPosts = events?.edges;
  const audioTracks = audios?.edges;

  // Use an effect hook to set the loading status to false after the posts are fetched
  useEffect(() => {
    if (posts) {
      setLoading(false);
    }
  }, [posts]);

  // Return the layout component with the banner, CTA, and main content sections
  return (
    <Layout>
      <Banner title="Catholic's Teachings" />
      <section className="mx-auto  max-w-screen-xl">
        {/* If the loading status is true, show the ArticlesPostListSkeleton
            component */}
        {loading ? (
          <ArticlesPostListSkeleton />
        ) : (
          // Otherwise, show the ArticlesPostList component with the posts, widgetPost, widgetTitle, readMoreLink, moreUrl, and audioTracks data
          <ArticlesPostList
            posts={posts}
            setPosts={setPosts}
            postType="itIsTheLORD"
            path="/itIsTheLORD"
            header="It is the LORD"
            widgetPost={catholicTeachingsPosts}
            widgetTitle="Catholic's Teachings"
            readMoreLink="/catholicTeachings"
            moreUrl="/catholicTeachings"
            audioTracks={audioTracks}
          />
        )}
      </section>
      <CTA />
      {eventsPosts.length > 0 && <EventCalendar posts={eventsPosts} />}
    </Layout>
  );
}

// Export the getStaticProps function
export const getStaticProps: GetStaticProps = async () => {
  // Fetch the data from the getAllItIsTheLORD function
  const data = await getAllItIsTheLORD({ after });

  // Return the props object with the itIsTheLORD, catholicTeachings, events, and audios data
  return {
    props: {
      itIsTheLORD: data.posts,
      catholicTeachings: data.catholicTeachings,
      events: data.events,
      audios: data.podcasts,
    },
    revalidate: 10,
  };
};
