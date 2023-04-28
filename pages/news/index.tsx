import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import Layout from "../../components/layout";
import { getAllNews } from "../../lib/api";
import EventCalendar from "../../components/event-calendars";
import ArticlesPostListSkeleton from "../../components/skeleton/articles-post-skeleton";
import Head from "next/head";

const ArticlesPostList = dynamic(
  () => import("../../components/articles-post"),
  {
    ssr: false,
  }
);

const after = null;
export default function Index({ news, featuredStories, events, audios }) {
  const [posts, setPosts] = useState(news);
  const [loading, setLoading] = useState(true);
  const featuredStoriesPosts = featuredStories?.edges;
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
      <Banner title="News" />
      <section className="mx-auto  max-w-screen-xl">
        {loading ? (
          <ArticlesPostListSkeleton />
        ) : (
          <ArticlesPostList
            posts={posts}
            setPosts={setPosts}
            postType="news"
            path="/news"
            header="News"
            widgetPost={featuredStoriesPosts}
            widgetTitle="Featured Stories"
            readMoreLink="/featuredStories"
            moreUrl="/featuredStories"
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
  const data = await getAllNews({ after });

  return {
    props: {
      news: data.posts,
      featuredStories: data.featuredStories,
      events: data.events,
      audios: data.podcasts,
    },
    revalidate: 10,
  };
};
