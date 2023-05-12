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

function Main(props) {
  return (
    <div>
      <FeaturedImage {...props} />
      <Content {...props} />
    </div>
  );
}

const Hero = () => <div className="h-96 w-full bg-blue-200"></div>;

export default function SocialDepartment({
  socialDepartment,
  events,
  preview,
}) {
  const router = useRouter();
  console.log("socialDepartment", socialDepartment);
  const { title, content, featuredImage } = socialDepartment;
  const eventsPosts = events?.edges;

  if (!router.isFallback && !socialDepartment?.databaseId) {
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
      <Section title={title}>{<Main {...socialDepartment} />}</Section>
      <CTA />
      <EventCalendar posts={eventsPosts} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getSingleSocialDepartmentPost(params?.id);

  return {
    props: {
      preview,
      socialDepartment: data.post,
      events: data.events,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const socialData = await getAllSocialDepartmentWithIds();
  return {
    paths:
      socialData.edges.map(
        ({ node }) => `/socialDepartment/${node.databaseId}`
      ) || [],
    fallback: true,
  };
};
