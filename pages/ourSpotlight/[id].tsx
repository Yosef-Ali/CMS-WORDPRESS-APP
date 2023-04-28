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
import FeaturedImage from "../../components/featured-image";
import Content from "../../components/content-single-page";
import Section from "../../components/section-single-page";
import Head from "next/head";

function Main(props) {
  return (
    <div>
      <FeaturedImage {...props} />
      <Content {...props} />
    </div>
  );
}

const Hero = () => <div className="h-96 w-full bg-blue-200"></div>;

export default function OurSpotlight({
  ourSpotlight,
  featuredStories,
  preview,
}) {
  const router = useRouter();
  const { title, content, featuredImage } = ourSpotlight;
  const featuredStoriesPosts = featuredStories?.edges;

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
        <meta property="og:image" content={featuredImage?.node.sourceUrl} />
      </Head>
      <Banner title="Our Spotlight" />
      <Section title={title}>{<Main {...ourSpotlight} />}</Section>
      <CTA />
      {featuredStoriesPosts?.length > 0 && (
        <FeatureStories posts={featuredStoriesPosts} />
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getSingleOurSpotlightPost(params?.id);

  console.log("data:", data);

  return {
    props: {
      preview,
      ourSpotlight: data.post,
      featuredStories: data.featuredStories,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ourSpotlight = await getAllOurSpotlightWithIds();
  return {
    paths:
      ourSpotlight.edges.map(
        ({ node }) => `/ourSpotlight/${node.databaseId}`
      ) || [],
    fallback: true,
  };
};
