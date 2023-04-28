import { GetStaticProps } from "next";
import Image from "next/image";
import parse from "html-react-parser";
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
        className="w-full rounded-lg object-cover object-center"
      />
    </div>
  );
}

function ProfileContent({ content }) {
  return (
    <div className="flex flex-1 flex-col lg:ml-8">
      <div className="prose -mt-10 max-w-none flex-grow pr-10">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
function ArchdioceseProfile(props) {
  return (
    <div className="mx-auto flex flex-wrap py-24">
      <ProfileImage {...props} />
      <ProfileContent {...props} />
    </div>
  );
}

const Hero = () => (
  <div className="hidden h-96 w-full bg-blue-200 lg:flex">
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
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

export default function Archdiocese({ archdiocese, events }) {
  const eventsPosts = events?.edges;
  const archdiocesePost = archdiocese.edges[0].node;
  const { title } = archdiocesePost;
  return (
    <Layout>
      <Hero />
      <section className="body-font mx-auto my-20 max-w-7xl text-gray-600">
        <div className="border-b-16 border-black/10 bg-blue-100/80 p-4 md:p-8 ">
          <h2 className="border-b-2 border-black/10 pb-4 text-3xl font-bold text-gray-900 sm:text-4xl ">
            {title}
          </h2>
          <ArchdioceseProfile {...archdiocesePost} />
        </div>
      </section>
      <Cta />
      {eventsPosts.length > 0 && <EventCalendar posts={eventsPosts} />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllPostsForArchdiocese();
  console.log("first", data);
  return {
    props: {
      archdiocese: data.pages,
      events: data.events,
    },
    revalidate: 10,
  };
};
