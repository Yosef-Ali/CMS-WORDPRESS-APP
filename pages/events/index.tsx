import { useState } from "react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import Layout from "../../components/layout";
import { getAllEventCalendars } from "../../lib/api";
import FeatureStories from "../../components/featured-story";

const ArticlesPostList = dynamic(
  () => import("../../components/articles-post"),
  {
    ssr: false,
  }
);
const batchSize = 6;
const after = null;
export default function Index({
  events,
  batchSize,
  catholicTVs,
  featuredStories,
  audios,
}) {
  const [posts, setPosts] = useState(events);
  //const eventsPosts = events?.edges;
  const catholicTVsPost = catholicTVs?.edges;
  const featuredStoriesPosts = featuredStories?.edges;
  const audioTracks = audios?.edges;

  //console.log("catholicTVsPost", catholicTVsPost);
  return (
    <Layout>
      <Banner title="Event Calendars" />
      <section className="mx-auto  max-w-screen-xl">
        <ArticlesPostList
          posts={posts}
          setPosts={setPosts}
          path="/events"
          header="Event Calendars"
          widgetPost={catholicTVsPost}
          widgetTitle="Recent News"
          readMoreLink="/news/newsArticle/"
          moreUrl="/news/articlesNews"
          audioTracks={audioTracks}
          //pageContext={"pageContext"}
        />
      </section>
      <CTA />
      {/* {featuredStoriesPosts.length > 0 && (
        <FeatureStories posts={featuredStoriesPosts} />
      )} */}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllEventCalendars({ after });

  //console.log("data-evens", data);
  return {
    props: {
      events: data.events,
      catholicTVs: data.catholicTVs,
      // featuredStories: data.featuredStories,
      audios: data.podcasts,
    },
    revalidate: 10,
  };
};
