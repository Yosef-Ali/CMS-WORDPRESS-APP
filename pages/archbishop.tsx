import { GetStaticProps } from "next";
import Image from "next/image";
import Banner from "../components/banner";
import CTA from "../components/cta";
import EventCalendar from "../components/event-calendars";
import { TimeIcon } from "../components/icons";
import Layout from "../components/layout";
import { getAllPostsForArchbishops } from "../lib/api";

function ProfileImage({ featuredImage }) {
  const ImageURL = featuredImage.node.sourceUrl;

  return (
    <div className="parish-profile-image">
      <Image
        width={2000}
        height={1000}
        src={ImageURL}
        alt="Archbishop image"
        className="object-cover object-center w-full "
      />
    </div>
  );
}

function ProfileContent({ content, archbishop }) {
  const name = content;
  const {
    birthDate,
    birthPlace,
    consecratedBishop,
    elevatedToTheCollegeOfCardinals,
    ordainedPriest,
    promotedArchbishop,
  } = archbishop;
  return (
    <div className="flex flex-col flex-1 lg:ml-8">
      <div className="flex-grow ">
        <div dangerouslySetInnerHTML={{ __html: name }} />
        <div className="flex">
          <div className="inline-flex items-center justify-center mb-4 rounded-full w-7 h-7 text-black/70 bg-black/10">
            <TimeIcon />
          </div>

          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">Birth Place: </span>
            {birthPlace}
          </span>
        </div>

        <div className="flex">
          <div className="inline-flex items-center justify-center mb-5 rounded-full w-7 h-7 text-black/70 bg-black/10">
            <TimeIcon />
          </div>
          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">Birth Date: </span>
            {birthDate}
          </span>
        </div>
        <div className="flex">
          <div className="inline-flex items-center justify-center mb-5 rounded-full w-7 h-7 text-black/70 bg-black/10">
            <TimeIcon />
          </div>
          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">Ordained Priest: </span>
            {ordainedPriest}
          </span>
        </div>
        <div className="flex">
          <div className="inline-flex items-center justify-center mb-5 rounded-full w-7 h-7 text-black/70 bg-black/10">
            <TimeIcon />
          </div>
          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">Consecrated Bishop: </span>
            {consecratedBishop}
          </span>
        </div>
        <div className="flex">
          <div className="inline-flex items-center justify-center mb-5 rounded-full w-7 h-7 text-black/70 bg-black/10">
            <TimeIcon />
          </div>
          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">Promoted Archbishop: </span>
            {promotedArchbishop}
          </span>
        </div>
        <div className="flex">
          <div className="inline-flex items-center justify-center mb-5 rounded-full w-7 h-7 text-black/70 bg-black/10">
            <TimeIcon />
          </div>
          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">
              Elevated To The College Of Cardinals:
            </span>{" "}
            {elevatedToTheCollegeOfCardinals}
          </span>
        </div>
      </div>
    </div>
  );
}
function ArchbishopProfile(props) {
  return (
    <div className="flex flex-wrap py-24 mx-auto">
      <ProfileImage {...props} />
      <ProfileContent {...props} />
    </div>
  );
}

export default function Arcbishops({ archbishops, events, preview }) {
  const eventsPosts = events?.edges;
  const archbishopPost = archbishops.edges[0].node;
  const { title } = archbishopPost;
  console.log("archbishopPost", archbishopPost);
  return (
    <Layout preview={preview}>
      <div className="hidden lg:block">
        <Banner title="Archbishop" />
      </div>
      <section className="mx-auto my-20 text-gray-600 body-font max-w-7xl">
        <div className="p-4 md:p-8 bg-blue-100/80 border-black/10 border-b-16 ">
          <h2 className="pb-4 text-3xl font-bold text-gray-900 border-b-2 sm:text-4xl border-black/10 ">
            {title}
          </h2>
          <ArchbishopProfile {...archbishopPost} />
        </div>
      </section>

      <CTA />
      {eventsPosts.length > 0 && <EventCalendar posts={eventsPosts} />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getAllPostsForArchbishops(preview);
  console.log("first", data);
  return {
    props: {
      archbishops: data.pages,
      events: data.events,
      preview,
    },
    revalidate: 10,
  };
};
