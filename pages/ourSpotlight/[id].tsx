import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Image from "next/image";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import FeatureStories from "../../components/featured-story";
import {
  getAllOurSpotlightWithIds,
  getSingleOurSpotlightPost,
} from "../../lib/api";
import Section from "../../components/section-single-page";
import Head from "next/head";
import Main from "../../components/main-single-page";

// Define the type for the our spotlight data
type OurSpotlight = {
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
  node: OurSpotlight;
};

// Define the type for the props
type OurSpotlightProps = {
  preview: boolean;
  ourSpotlight: OurSpotlight | null;
  featuredStories: FeaturedStory[] | null;
};

export default function OurSpotlightPage({
  ourSpotlight,
  featuredStories,
  preview,
}: OurSpotlightProps) {
  const router = useRouter();
  const { title, content, featuredImage } = ourSpotlight ?? {};
  const featuredImageSrc = featuredImage?.node.sourceUrl;
  const featuredStoriesPosts = featuredStories ?? [];

  if (!router.isFallback && !ourSpotlight?.databaseId) {
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
      <Banner title="Our Spotlight" />
      <Section title={title}>
        <Main content={content} featuredImageSrc={featuredImageSrc} />
      </Section>
      <CTA />
      {featuredStoriesPosts?.length > 0 && (
        <FeatureStories stories={featuredStoriesPosts} />
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<OurSpotlightProps> = async ({
  params,
  preview = false,
}) => {
  const data = await getSingleOurSpotlightPost(params?.id);

  return {
    props: {
      preview,
      ourSpotlight: data.post ?? null,
      featuredStories: data.featuredStories?.edges ?? null,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllOurSpotlightWithIds();
  const paths = posts.edges.map(({ node }) => ({
    params: { id: String(node.databaseId) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
