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
        className="w-full object-cover object-center "
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
    <div className="flex flex-1 flex-col lg:ml-8">
      <div className="flex-grow ">
        <div dangerouslySetInnerHTML={{ __html: name }} />
        <div className="flex">
          <div className="mb-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
            <TimeIcon />
          </div>

          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">Birth Place: </span>
            {birthPlace}
          </span>
        </div>

        <div className="flex">
          <div className="mb-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
            <TimeIcon />
          </div>
          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">Birth Date: </span>
            {birthDate}
          </span>
        </div>
        <div className="flex">
          <div className="mb-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
            <TimeIcon />
          </div>
          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">Ordained Priest: </span>
            {ordainedPriest}
          </span>
        </div>
        <div className="flex">
          <div className="mb-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
            <TimeIcon />
          </div>
          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">Consecrated Bishop: </span>
            {consecratedBishop}
          </span>
        </div>
        <div className="flex">
          <div className="mb-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
            <TimeIcon />
          </div>
          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">Promoted Archbishop: </span>
            {promotedArchbishop}
          </span>
        </div>
        <div className="flex">
          <div className="mb-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
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
    <div className="mx-auto flex flex-wrap py-24">
      <ProfileImage {...props} />
      <ProfileContent {...props} />
    </div>
  );
}

export default function Arcbishops({ archbishops, events }) {
  const eventsPosts = events?.edges;
  const archbishopPost = archbishops.edges[0].node;
  const { title } = archbishopPost;
  console.log("archbishopPost", archbishopPost);
  return (
    <Layout>
      <div className="hidden lg:block">
        <Banner title="Archbishop" />
      </div>
      <section className="body-font mx-auto my-20 max-w-7xl text-gray-600">
        <div className="border-b-16 border-black/10 bg-blue-100/80 p-4 md:p-8 ">
          <h2 className="border-b-2 border-black/10 pb-4 text-3xl font-bold text-gray-900 sm:text-4xl ">
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

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllPostsForArchbishops();
  return {
    props: {
      archbishops: data.pages,
      events: data.events,
    },
    revalidate: 10,
  };
};
