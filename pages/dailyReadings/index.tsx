import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import Layout from "../../components/layout";
import { getAllDailyReadings } from "../../lib/api";
import FeatureStories from "../../components/featured-story";
import ArticlesPostListSkeleton from "../../components/skeleton/articles-post-skeleton";

const ArticlesPostList = dynamic(
  () => import("../../components/articles-post"),
  {
    ssr: false,
  }
);

const after = null;
export default function Index({
  dailyReadings,
  news,
  featuredStories,
  audios,
}) {
  const [posts, setPosts] = useState(dailyReadings);
  const [loading, setLoading] = useState(true);
  //const eventsPosts = events?.edges;
  const newsPost = news?.edges;
  const featuredStoriesPosts = featuredStories?.edges;
  const audioTracks = audios?.edges;
  console.log("newsPost", newsPost);

  //to set the loading state to false when posts are present.
  useEffect(() => {
    if (posts) {
      setLoading(false);
    }
  }, [posts]);

  //console.log("catholicTVsPost", catholicTVsPost);
  return (
    <Layout>
      <Banner title="Daily Readings" />
      <section className="mx-auto  max-w-screen-xl">
        {loading ? (
          <ArticlesPostListSkeleton />
        ) : (
          <ArticlesPostList
            posts={posts}
            setPosts={setPosts}
            postType="dailyReadings"
            path="/dailyReadings"
            header="Daily Readings"
            widgetPost={newsPost}
            widgetTitle="Recent News"
            readMoreLink="/news"
            moreUrl="/news"
            audioTracks={audioTracks}
          />
        )}
      </section>
      <CTA />
      {featuredStoriesPosts.length > 0 && (
        <FeatureStories posts={featuredStoriesPosts} />
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllDailyReadings({ after });

  console.log("getAllDailyReadings", data);
  return {
    props: {
      dailyReadings: data.posts,
      news: data.news,
      featuredStories: data.featuredStories,
      audios: data.podcasts,
    },
    revalidate: 10,
  };
};
