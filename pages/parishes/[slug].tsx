import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { GetStaticPaths, GetStaticProps } from "next";
import Header from "../../components/header";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import { getAllParishesWithSlug, getSingleParishPost } from "../../lib/api";
import CTA from "../../components/cta";
import Banner from "../../components/banner";
import {
  Mass,
  ParishContact,
  PriestProfile,
} from "../../components/parish-page-components";
import Image from "next/image";
import EventCalendar from "../../components/event-calendars";

function ProfileImage(props) {
  const ImageUrl = props.featuredImage?.node.sourceUrl;
  return (
    <div className="parish-profile-image">
      <Image
        width={2000}
        height={1000}
        src={ImageUrl}
        alt="parish image"
        className="object-cover object-center w-full h-full"
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
    <div className="flex flex-wrap px-5 py-24 mx-auto">
      <ProfileImage {...props} />
      <ProfileContent {...props} />
    </div>
  );
}

function Section({ title, children }) {
  console.log("Sectiontitle", title);
  return (
    <section className="mx-auto my-20 text-gray-600 body-font max-w-7xl">
      <div className="p-4 md:p-8 bg-blue-100/80 border-black/10 border-b-16 ">
        <h2 className="pb-4 text-3xl font-bold text-gray-900 border-b-2 sm:text-4xl border-black/10 ">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

export default function Parish({ parish, events, preview }) {
  const router = useRouter();

  const eventsPosts = events?.edges;

  if (!router.isFallback && !parish?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
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
  // console.log("params?.slug", params?.slug);

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
