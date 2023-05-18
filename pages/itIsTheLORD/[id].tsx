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
import Main from "../../components/main-single-page";

// Define the type for the post data
type Post = {
  title: string;
  content: string;
  databaseId: number;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
};

// Define the type for the featured story data
type FeaturedStory = {
  node: Post;
};

// Define the type for the props
type ItIsTheLORDProps = {
  preview: boolean;
  post: Post | null;
  featuredStories: FeaturedStory[] | null;
};

export default function ItIsTheLORD({
  post,
  featuredStories,
  preview,
}: ItIsTheLORDProps) {
  const router = useRouter();
  const { title, content, featuredImage } = post ?? {};
  const featuredImageSrc = featuredImage?.node.sourceUrl;

  if (!router.isFallback && !post?.databaseId) {
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
      <Banner title="Catholic's Teachings" />
      <Section title={title}>
        {<Main content={content} featuredImageSrc={featuredImageSrc} />}
      </Section>
      <CTA />
      {featuredStories?.length > 0 && (
        <FeatureStories stories={featuredStories} />
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<ItIsTheLORDProps> = async ({
  params,
  preview = false,
}) => {
  const data = await getSinglePost(params?.id as string);

  return {
    props: {
      preview,
      post: data.post ?? null,
      featuredStories: data.featuredStories?.edges ?? null,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const posts = await getAllPostsWithIds();
  const paths = posts.edges.map(({ node }) => ({
    params: {
      id: node.databaseId.toString(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
