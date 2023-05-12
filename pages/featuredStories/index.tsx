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

// Import the getAllFeaturedStories function from the lib/api file
import { getAllFeaturedStories } from "../../lib/api";

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
export default function Index({ events, news, featuredStories, audios }) {
  // Create a state variable for the posts and set it to the featuredStories data
  const [posts, setPosts] = useState(featuredStories);

  // Create a state variable for the loading status and set it to true
  const [loading, setLoading] = useState(true);

  // Get the newsPost, eventsPosts, and audioTracks data
  const newsPost = news?.edges;
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
      <Banner title="Featured Stories" />
      <section className="mx-auto  max-w-screen-xl">
        {loading ? (
          <ArticlesPostListSkeleton />
        ) : (
          // This is an if/else statement that will render the ArticlesPostListSkeleton component if the loading status is true, or the ArticlesPostList component with the posts, widgetPost, widgetTitle, readMoreLink, moreUrl, and audioTracks data if the loading status is false.
          <ArticlesPostList
            posts={posts}
            postType="posts"
            setPosts={setPosts}
            path="/featuredStories"
            header="Featured Stories"
            widgetPost={newsPost}
            widgetTitle="Recent News"
            readMoreLink="/news"
            moreUrl="/news"
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
  // Fetch the data from the getAllFeaturedStories function
  const data = await getAllFeaturedStories({ after });

  // Return the props object with the featuredStories, news, events, and audios data
  return {
    props: {
      featuredStories: data.featuredStories,
      news: data.posts,
      events: data.events,
      audios: data.podcasts,
    },
    revalidate: 10,
  };
};
