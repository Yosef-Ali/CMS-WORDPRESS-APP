import { useState } from "react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import Layout from "../../components/layout";
import { getAllEventCalendars, getAllPodcasts } from "../../lib/api";
import FeatureStories from "../../components/featured-story";

const ArticlesPostList = dynamic(
  () => import("../../components/articles-post"),
  {
    ssr: false,
  }
);

const after = null;
export default function Index({
  podcasts,
  catholicTeachings,
  featuredStories,
  audios,
}) {
  const [posts, setPosts] = useState(podcasts);

  const catholicTeachingsPost = catholicTeachings?.edges;
  const featuredStoriesPosts = featuredStories?.edges;
  const audioTracks = audios?.edges;

  return (
    <Layout>
      <Banner title="Podcasts" />
      <section className="mx-auto  max-w-screen-xl">
        <ArticlesPostList
          posts={posts}
          setPosts={setPosts}
          postType="podcasts"
          path="/podcasts"
          header="Podcasts"
          widgetPost={catholicTeachingsPost}
          widgetTitle="Catholic Teachings"
          readMoreLink="/catholicTeachings"
          moreUrl="/catholicTeachings"
          audioTracks={audioTracks}
        />
      </section>
      <CTA />
      {featuredStoriesPosts.length > 0 && (
        <FeatureStories stories={featuredStoriesPosts} />
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllPodcasts({ after });

  return {
    props: {
      podcasts: data.podcasts,
      catholicTeachings: data.posts,
      audios: data.audios,
      featuredStories: data.featuredStories,
    },
    revalidate: 10,
  };
};
