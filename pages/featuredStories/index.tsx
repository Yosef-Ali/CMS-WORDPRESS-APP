import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import Layout from "../../components/layout";
import { getAllFeaturedStories } from "../../lib/api";
import FeatureStories from "../../components/featured-story";
import EventCalendar from "../../components/event-calendars";
import ArticlesPostListSkeleton from "../../components/skeleton/articles-post-skeleton";

const ArticlesPostList = dynamic(
  () => import("../../components/articles-post"),
  {
    ssr: false,
  }
);

const after = null;
export default function Index({ events, news, featuredStories, audios }) {
  const [posts, setPosts] = useState(featuredStories);
  const [loading, setLoading] = useState(true);
  const newsPost = news?.edges;
  const eventsPosts = events?.edges;
  const audioTracks = audios?.edges;

  useEffect(() => {
    if (posts) {
      setLoading(false);
    }
  }, [posts]);

  //console.log("catholicTVsPost", catholicTVsPost);
  return (
    <Layout>
      <Banner title="Featured Stories" />
      <section className="mx-auto  max-w-screen-xl">
        {loading ? (
          <ArticlesPostListSkeleton />
        ) : (
          <ArticlesPostList
            posts={posts}
            postType={featuredStories}
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

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllFeaturedStories({ after });

  //console.log("data-evens", data);
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
