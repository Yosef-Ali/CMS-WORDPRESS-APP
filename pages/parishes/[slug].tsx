import { useMemo } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { getAllParishesWithSlug, getSingleParishPost } from "../../lib/api";
import ErrorPage from "next/error";
import Header from "../../components/header";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import CTA from "../../components/cta";
import Banner from "../../components/banner";
import {
  Mass,
  ParishContact,
  PriestProfile,
} from "../../components/parish-page-components";
import Image from "next/image";
import EventCalendar from "../../components/event-calendars";
import Head from "next/head";

function ProfileImage(props) {
  const imageUrl = useMemo(
    () => props.featuredImage?.node.sourceUrl,
    [props.featuredImage]
  );
  const ImageUrl = props.featuredImage?.node.sourceUrl;
  return (
    <div className="parish-profile-image">
      <Image
        width={2000}
        height={1000}
        src={imageUrl}
        alt="parish image"
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
}

function ProfileContent(props) {
  const { content } = props;

  return (
    <div className="parish-profile-content">
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PriestProfile {...props} />
      <Mass {...props} />
      <ParishContact {...props} />
    </div>
  );
}

function ParishProfile(props) {
  return (
    <div className="mx-auto flex flex-wrap px-5 py-24">
      <ProfileImage {...props} />
      <ProfileContent {...props} />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="body-font mx-auto my-20 max-w-7xl text-gray-600">
      <div className="border-b-16 border-black/10 bg-blue-100/80 p-4 md:p-8 ">
        <h2 className="border-b-2 border-black/10 pb-4 text-3xl font-bold text-gray-900 sm:text-4xl ">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

export default function Parish({ parish, events }) {
  const router = useRouter();

  const { title, content, featuredImage } = parish;
  const eventsPosts = events?.edges;

  if (!router.isFallback && !parish?.slug) {
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

      <Header />
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <Banner title="Parish" />
          <Section title={parish.title}>
            <ParishProfile {...parish} />
          </Section>
          <CTA />
          {eventsPosts.length > 0 && <EventCalendar posts={eventsPosts} />}
        </>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getSingleParishPost(params?.slug);

  return {
    props: {
      parish: data.parish,
      events: data.events,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const parishes = await getAllParishesWithSlug();
  //console.log("getAllParishesWithSlug", parishes);
  return {
    paths: parishes.edges.map(({ node }) => `/parishes/${node.slug}`) || [],
    fallback: true,
  };
};
