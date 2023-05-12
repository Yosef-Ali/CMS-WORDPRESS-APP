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

// Import the getAllTeachings function from the lib/api file
import { getAllTeachings } from "../../lib/api";

// Import the youtubeThumbnail function from "youtube-thumbnail";
import { youtubeThumbnail } from "youtube-thumbnail";

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
export default function Index({ teachings, itIsTheLORD, events, audios }) {
  // Create a state variable for the posts and set it to the teachings data
  const [posts, setPosts] = useState(teachings);

  // Create a state variable for the loading status and set it to true
  const [loading, setLoading] = useState(true);

  // Get the itIsTheLORDPosts, eventsPosts, and audioTracks data
  const itIsTheLORDPosts = itIsTheLORD?.edges;
  const eventsPosts = events?.edges;
  const audioTracks = audios?.edges;

  // Use an effect hook to set the loading status to false after the posts are fetched
  useEffect(() => {
    if (posts) {
      setLoading(false);
    }
  }, [posts]);

  return (
    <Layout>
      <Banner title="Catholic Teachings" />

      <section className="mx-auto  max-w-screen-xl">
        {loading ? (
          <ArticlesPostListSkeleton />
        ) : (
          <ArticlesPostList
            posts={posts}
            setPosts={setPosts}
            postType="catholicTeachings"
            path="/catholicTeachings"
            header="Catholic's Teachings"
            widgetPost={itIsTheLORDPosts}
            widgetTitle="It is the LORD"
            readMoreLink="/itIsTheLORD"
            moreUrl="/itIsTheLORD"
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
  const data = await getAllTeachings({ after });

  return {
    props: {
      teachings: data.posts,
      itIsTheLORD: data.itIsTheLORD,
      events: data.events,
      audios: data.podcasts,
    },
    revalidate: 10,
  };
};
