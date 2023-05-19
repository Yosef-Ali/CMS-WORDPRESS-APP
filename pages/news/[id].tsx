import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import ErrorPage from "next/error";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import FeatureStories from "../../components/featured-story";
import Section from "../../components/section-single-page";
import Main from "../../components/main-single-page";

import { getAllPostsWithIds, getSinglePost } from "../../lib/api";

interface Post {
  title: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  videoSource?: {
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

interface NewsProps {
  post?: Post;
  featuredStories?: FeaturedStory[];
  preview?: boolean;
}

export default function News({ post, featuredStories, preview }: NewsProps) {
  const { title, content, featuredImage, videoSource } = post ?? {};
  const featuredImageSrc = featuredImage?.node.sourceUrl;

  if (!post?.title || !content) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content.slice(0, 50)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.slice(0, 180)} />
        <meta property="og:image" content={featuredImageSrc} />
      </Head>
      <Banner title="Catholic TV News" />
      <Section title={title}>
        <Main
          content={content}
          featuredImageSrc={featuredImageSrc}
          videoSource={videoSource}
        />
      </Section>
      <CTA />
      {featuredStories?.length > 0 && (
        <FeatureStories stories={featuredStories} />
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<NewsProps> = async ({
  params,
  preview = false,
}) => {
  const data = await getSinglePost(params?.id);

  return {
    props: {
      preview,
      post: data.post ?? null,
      featuredStories: data.featuredStories?.edges ?? null,
    },
    revalidate: 10, // Regenerate every 10 seconds
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
