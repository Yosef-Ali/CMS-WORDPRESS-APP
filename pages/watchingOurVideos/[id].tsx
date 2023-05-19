import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import FeatureStories from "../../components/featured-story";
import { getAllPostsWithIds, getSinglePost } from "../../lib/api";
import Section from "../../components/section-single-page";
import YouTubePlayer from "../../components/youtube-player";
import Content from "../../components/content-single-page";

interface Post {
  title: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  videoSource: {
    acfvideosource: string;
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

interface WatchingOurVideosProps {
  news: Post;
  featuredStories?: FeaturedStory[];
  preview: boolean;
}

const WatchingOurVideos = ({
  news,
  featuredStories = [],
  preview,
}: WatchingOurVideosProps) => {
  const router = useRouter();
  const { title, content, videoSource } = news;
  const { acfvideosource } = videoSource || {};

  if (!title || !content) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content.slice(0, 50)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.slice(0, 180)} />
      </Head>

      <Banner title="Catholic's Teachings" />
      <Section title={title}>
        {/* in this case featuredImageSrc is a video file */}
        <YouTubePlayer videoSrc={acfvideosource} />
        <Content content={content} />
      </Section>
      <CTA />
      {featuredStories?.length > 0 && (
        <FeatureStories stories={featuredStories} />
      )}
    </Layout>
  );
};

export default WatchingOurVideos;

export const getStaticProps: GetStaticProps<WatchingOurVideosProps> = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getSinglePost(params?.id as string);
  return {
    props: {
      preview,
      news: data.post,
      featuredStories: data.featuredStories?.edges ?? null,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPostsWithIds();
  const paths = posts.edges.map(({ node }) => ({
    params: { id: String(node.databaseId) },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
