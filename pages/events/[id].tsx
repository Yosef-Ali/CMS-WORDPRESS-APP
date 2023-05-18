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

// Define the type for the event data
type Event = {
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
  node: Event;
};

// Define the type for the props
type EventProps = {
  preview: boolean;
  event: Event | null;
  featuredStories: FeaturedStory[] | null;
};

interface MainProps {
  videoSource?: {
    acfvideosource: string;
  };
  featuredImageSrc?: string;
  content: string;
}

function Main(props: MainProps) {
  return (
    <div>
      <FeaturedImage {...props} />
      <Content {...props} />
    </div>
  );
}

export default function EventPage({
  event,
  featuredStories,
  preview,
}: EventProps) {
  const router = useRouter();
  const { title, content, featuredImage } = event ?? {};
  const featuredImageSrc = featuredImage?.node.sourceUrl;
  const featuredStoriesPosts = featuredStories ?? [];

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
        <meta property="og:image" content={featuredImageSrc} />
      </Head>
      <Banner title="Event Calendars" />
      <Section title={title}>
        {<Main content={content} featuredImageSrc={featuredImageSrc} />}
      </Section>
      <CTA />
      {featuredStoriesPosts.length > 0 && (
        <FeatureStories stories={featuredStoriesPosts} />
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<EventProps> = async ({
  params,
  preview = false,
}) => {
  const data = await getSingleEventPost(params?.id);

  return {
    props: {
      preview,
      event: data.event ?? null,
      featuredStories: data.featuredStories?.edges ?? null,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllEventWithIds();
  const paths = events.edges.map(({ node }) => ({
    params: { id: String(node.databaseId) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
