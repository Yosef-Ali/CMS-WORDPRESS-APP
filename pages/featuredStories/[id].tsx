import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import Content from "../../components/content-single-page";
import Section from "../../components/section-single-page";
import CTA from "../../components/cta";

import {
  getAllFeaturedStoriesWithIds,
  getSingleFeaturedStory,
} from "../../lib/api";
import EventCalendar from "../../components/event-calendars";
import FeaturedImage from "../../components/featured-image";
import Main from "../../components/main-single-page";

// Define the type for the featured story data
type FeaturedStory = {
  title: string;
  content: string;
  databaseId: number;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
};

// Define the type for the event data
type Event = {
  node: {
    title: string;
    content: string;
    databaseId: number;
    featuredImage: {
      node: {
        sourceUrl: string;
      };
    };
  };
};

// Define the type for the props
type FeaturedStoryProps = {
  preview: boolean;
  featuredStory: FeaturedStory | null;
  events: Event[] | null;
};

export default function FeaturedStoryPage({
  featuredStory,
  events,
  preview,
}: FeaturedStoryProps) {
  const router = useRouter();
  const { title, content, featuredImage } = featuredStory ?? {};
  const featuredImageSrc = featuredImage?.node.sourceUrl;
  const eventsPosts = events ?? [];

  if (!router.isFallback && !featuredStory?.databaseId) {
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
      <Banner title="Featured Stories" />
      <Section title={title}>
        {<Main content={content} featuredImageSrc={featuredImageSrc} />}
      </Section>
      <CTA />
      {eventsPosts.length > 0 && <EventCalendar posts={eventsPosts} />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<FeaturedStoryProps> = async ({
  params,
  preview = false,
}) => {
  const data = await getSingleFeaturedStory(params?.id);

  return {
    props: {
      preview,
      featuredStory: data.post ?? null,
      events: data.events?.edges ?? null,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllFeaturedStoriesWithIds();
  const paths = posts.edges.map(({ node }) => ({
    params: { id: String(node.databaseId) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
