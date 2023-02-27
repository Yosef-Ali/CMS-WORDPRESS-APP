import { GetStaticProps } from "next";
import Image from "next/image";
import { getAllPostsForArchdiocese } from "../lib/api";
import Layout from "../components/layout";
import Cta from "../components/cta";
import EventCalendar from "../components/event-calendars";
import FeatureStories from "../components/featured-story";

function ProfileImage({ featuredImage }) {
  const ImageUrl = featuredImage.node.sourceUrl;

  return (
    <div className="parish-profile-image">
      <Image
        width={2000}
        height={1000}
        src={ImageUrl}
        alt="Archdiocese image"
        className="object-cover object-center w-full rounded-lg"
      />
    </div>
  );
}

function ProfileContent({ content }) {
  return (
    <div className="flex flex-col flex-1 lg:ml-8">
      <div className="flex-grow">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
function ArchdioceseProfile(props) {
  return (
    <div className="flex flex-wrap py-24 mx-auto">
      <ProfileImage {...props} />
      <ProfileContent {...props} />
    </div>
  );
}

const Hero = () => (
  <div className="hidden w-full bg-blue-200 h-96 lg:flex">
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
      <h2 className="mb-3 text-4xl font-extrabold leading-snug text-primary">
        You are called to spread the parfume of the Gospel for the people of
        Ethiopia.
      </h2>
      <p className="text-gray-500">
        -- Pope John Paul II for the Bishops of ethiopia
      </p>
    </div>
  </div>
);

export default function Archdiocese({
  archdiocese,
  featuredStories,
  events,
  preview,
}) {
  const eventsPosts = events?.edges;
  const featuredStoriesPosts = featuredStories?.edges;
  const archdiocesePost = archdiocese.edges[0].node;
  const { title } = archdiocesePost;
  return (
    <Layout preview={preview}>
      <Hero />
      <section className="mx-auto my-20 text-gray-600 body-font max-w-7xl">
        <div className="p-4 md:p-8 bg-blue-100/80 border-black/10 border-b-16 ">
          <h2 className="pb-4 text-3xl font-bold text-gray-900 border-b-2 sm:text-4xl border-black/10 ">
            {title}
          </h2>
          <ArchdioceseProfile {...archdiocesePost} />
        </div>
      </section>

      {featuredStoriesPosts.length > 0 && (
        <FeatureStories posts={eventsPosts} />
      )}
      <Cta />
      {eventsPosts.length > 0 && <EventCalendar posts={eventsPosts} />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getAllPostsForArchdiocese(preview);
  console.log("first", data);
  return {
    props: {
      archdiocese: data.pages,
      featuredStories: data.featuredStories,
      events: data.events,
      preview,
    },
    revalidate: 10,
  };
};
