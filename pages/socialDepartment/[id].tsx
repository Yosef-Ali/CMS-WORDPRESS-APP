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
  getAllSocialDepartmentWithIds,
  getSingleSocialDepartmentPost,
} from "../../lib/api";
import EventCalendar from "../../components/event-calendars";
import FeaturedImage from "../../components/featured-image";
import Main from "../../components/main-single-page";

interface Post {
  title: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

interface eventsNode {
  content: string;
  title: string;
  databaseId: number; // change this from string to number
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

interface events {
  node: eventsNode;
}

interface SocialDepartmentProps {
  socialDepartment?: Post;
  events?: events[];
  preview?: boolean;
}

const Hero = () => <div className="h-96 w-full bg-blue-200"></div>;

export default function SocialDepartment({
  socialDepartment,
  events,
  preview,
}: SocialDepartmentProps) {
  const { title, content, featuredImage } = socialDepartment ?? {};
  const featuredImageSrc = featuredImage?.node.sourceUrl;
  const eventsPosts = events ?? [];

  if (!socialDepartment?.title || !content) {
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
      <Banner title="Social Department" />
      <Section title={title}>
        <Main content={content} featuredImageSrc={featuredImageSrc} />
      </Section>
      <CTA />
      <EventCalendar posts={eventsPosts} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<SocialDepartmentProps> = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getSingleSocialDepartmentPost(params?.id);

  return {
    props: {
      preview,
      socialDepartment: data.post,
      events: data.events?.edges ?? null,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const socialData = await getAllSocialDepartmentWithIds();

  const paths = socialData.edges.map(({ node }) => ({
    params: { id: String(node.databaseId) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
