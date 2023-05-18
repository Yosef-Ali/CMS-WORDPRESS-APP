import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import FeatureStories from "../../components/featured-story";
import ArticlesPostDetail from "../../components/article-post-detail";
import CTA from "../../components/cta";
import {
  getAllDailyReadingsWithIds,
  getSingleDailyReadingPost,
} from "../../lib/api";

interface Post {
  title: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

interface FeaturedStoryNode {
  content: string;
  title: string;
  databaseId: number; // change this from string to number
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

interface FeaturedStory {
  node: FeaturedStoryNode;
}

interface Podcast {
  content: string;
  title: string;
  databaseId: number; // change this from string to number
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  audioUrl: {
    audiourl: string;
  };
}

interface DailyReadingProps {
  preview: boolean;
  dailyReading?: Post;
  featuredStories?: FeaturedStory[];
  dailyReadings?: FeaturedStory[];
  podcasts?: Podcast[];
}

export default function DailyReadingPage({
  dailyReading,
  featuredStories,
  dailyReadings,
  podcasts,
  preview,
}: DailyReadingProps) {
  const { title, content, featuredImage } = dailyReading ?? {};
  const featuredImageSrc = featuredImage?.node.sourceUrl;
  const featuredStoriesPosts = featuredStories ?? [];
  const widgetsPosts = dailyReadings ?? [];
  const audioTracks = podcasts ?? [];

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content.slice(0, 50)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.slice(0, 180)} />
        <meta property="og:image" content={featuredImageSrc} />
      </Head>
      <Banner title="Daily Readings" />
      <section className="mx-auto max-w-screen-xl">
        <ArticlesPostDetail
          post={dailyReading}
          widgetPosts={widgetsPosts}
          widgetTitle="Recent Reading"
          readMoreLink="/dailyReadings"
          moreUrl="/dailyReadings"
          audioTracks={audioTracks}
        />
      </section>
      <CTA />
      <FeatureStories stories={featuredStoriesPosts} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<DailyReadingProps> = async ({
  params,
  preview = false,
}) => {
  const data = await getSingleDailyReadingPost(params?.id as string);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      dailyReading: data.post ?? null,
      featuredStories: data.featuredStories?.edges ?? null,
      dailyReadings: data.dailyReadings?.edges ?? null,
      podcasts: data.podcasts?.edges ?? null,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dailyReadings = await getAllDailyReadingsWithIds();
  const paths = dailyReadings.edges.map(({ node }) => ({
    params: { id: String(node.databaseId) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
