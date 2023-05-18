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

// Define the type for the parish data
type Parish = {
  title: string;
  content: string;
  slug: string;
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
type ParishProps = {
  parish: Parish | null;
  events: Event[] | null;
};

function ProfileImage(props: Parish) {
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

function ProfileContent(props: Parish) {
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

function ParishProfile(props: Parish) {
  return (
    <div className="mx-auto flex flex-wrap px-5 py-24">
      <ProfileImage {...props} />
      <ProfileContent {...props} />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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

export default function ParishPage({ parish, events }: ParishProps) {
  const router = useRouter();
  const { title, content, featuredImage } = parish ?? {};
  const featuredImageSrc = featuredImage?.node.sourceUrl;
  const eventsPosts = events ?? [];

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
        <meta property="og:image" content={featuredImageSrc} />
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

export const getStaticProps: GetStaticProps<ParishProps> = async ({
  params,
}) => {
  const data = await getSingleParishPost(params?.slug as string);

  return {
    props: {
      parish: data.parish ?? null,
      events: data.events?.edges ?? null,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const parishes = await getAllParishesWithSlug();
  const paths = parishes.edges.map(({ node }) => ({
    params: { slug: node.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
