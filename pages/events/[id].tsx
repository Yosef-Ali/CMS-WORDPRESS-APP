import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import FeatureStories from "../../components/featured-story";
import { getAllEventWithIds, getSingleEventPost } from "../../lib/api";
import FeaturedImage from "../../components/featured-image";
import Content from "../../components/content-single-page";
import Section from "../../components/section-single-page";

function Main(props) {
  return (
    <div>
      <FeaturedImage {...props} />
      <Content {...props} />
    </div>
  );
}

const Hero = () => <div className="h-96 w-full bg-blue-200"></div>;

export default function Event({ event, featuredStories, preview }) {
  const router = useRouter();
  const { title, content, featuredImage } = event;
  const featuredStoriesPosts = featuredStories?.edges;

  if (!router.isFallback && !event?.databaseId) {
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
      <Banner title="Event Calendars" />
      <Section title={title}>{<Main {...event} />}</Section>
      <CTA />
      {featuredStoriesPosts.length > 0 && (
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
  const data = await getSingleEventPost(params?.id);

  return {
    props: {
      preview,
      event: data.event,
      featuredStories: data.featuredStories,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllEventWithIds();
  return {
    paths: events.edges.map(({ node }) => `/events/${node.databaseId}`) || [],
    fallback: true,
  };
};
