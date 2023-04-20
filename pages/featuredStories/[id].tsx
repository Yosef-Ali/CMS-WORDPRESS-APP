import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Image from "next/image";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import CTA from "../../components/cta";

import {
  getAllFeaturedStoriesWithIds,
  getSingleFeaturedStory,
} from "../../lib/api";
import EventCalendar from "../../components/event-calendars";

function FeaturedImage(props) {
  const imageUrl = props.featuredImage?.node.sourceUrl;
  return (
    <div>
      <Image
        width={2000}
        height={1000}
        alt={""}
        src={imageUrl}
        className="aspect-video w-full object-cover "
      />
    </div>
  );
}

function Content(props) {
  const router = useRouter();
  const { content, title } = props;
  return (
    <div className="max-w-screen-sm pt-6">
      <h2 className="text-md font-noto py-6 font-bold text-gray-900 antialiased">
        {title}
      </h2>
      <div className="font-noto prose text-gray-900 antialiased">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="mt-16 text-center">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center rounded bg-secondary px-6 py-3 text-white transition hover:bg-secondary/90 hover:shadow-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

function Main(props) {
  return (
    <div>
      <FeaturedImage {...props} />
      <Content {...props} />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="body-font text-gray-800">
      <div className="container mx-auto mb-24 max-w-2xl">
        <div className="border-b-16 border-black/10 px-4 py-8">
          <h2 className="text-md title-font font-noto border-b-2 border-black/10 pb-4 font-bold text-gray-900 sm:text-xl ">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}

const Hero = () => <div className="h-96 w-full bg-blue-200"></div>;

export default function FeaturedStory({ featuredStory, events, preview }) {
  const router = useRouter();
  const title = featuredStory.title;
  const eventsPosts = events?.edges;

  if (!router.isFallback && !featuredStory?.databaseId) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Banner title="Featured Stories" />
      <Section title={title}>{<Main {...featuredStory} />}</Section>
      <CTA />
      {eventsPosts.length > 0 && <EventCalendar posts={eventsPosts} />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getSingleFeaturedStory(params?.id);

  return {
    props: {
      preview,
      featuredStory: data.featuredStory,
      events: data.events,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllFeaturedStoriesWithIds();
  return {
    paths:
      events.edges.map(({ node }) => `/featuredStories/${node.databaseId}`) ||
      [],
    fallback: true,
  };
};
