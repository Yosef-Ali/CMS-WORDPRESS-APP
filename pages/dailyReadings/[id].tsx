import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import FeatureStories from "../../components/featured-story";
import {
  getAllDailyReadingsWithIds,
  getSingleDailyReadingPost,
} from "../../lib/api";

import ArticlesPostDetail from "../../components/article-post-detail";
import Head from "next/head";

const Hero = () => <div className="h-96 w-full bg-blue-200"></div>;

export default function DailyReading({
  dailyReading,
  featuredStories,
  dailyReadings,
  podcasts,
  preview,
}) {
  const { title, content, featuredImage } = dailyReading;
  const featuredStoriesPosts = featuredStories?.edges;
  const widgetsPosts = dailyReadings?.edges;
  const audio = podcasts?.edges;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content.slice(0, 50)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.slice(0, 180)} />
        <meta property="og:image" content={featuredImage?.node.sourceUrl} />
      </Head>
      <Banner title="Daily Readings" />
      <section className="mx-auto  max-w-screen-xl">
        <ArticlesPostDetail
          post={dailyReading}
          widgetPosts={widgetsPosts}
          widgetTitle="Recent Reading"
          readMoreLink="/dailyReadings"
          moreUrl="/dailyReadings"
          audioTracks={audio}
        />
      </section>
      <CTA />

      <FeatureStories posts={featuredStoriesPosts} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getSingleDailyReadingPost(params?.id);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      dailyReading: data.post,
      featuredStories: data.featuredStories,
      dailyReadings: data.dailyReadings,
      podcasts: data.podcasts,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dailyReadings = await getAllDailyReadingsWithIds();
  return {
    paths:
      dailyReadings.edges.map(
        ({ node }) => `/dailyReadings/${node.databaseId}`
      ) || [],
    fallback: true,
  };
};
