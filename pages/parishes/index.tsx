import Image from "next/image";
import { GetStaticProps } from "next";
import { useRouter } from "next/navigation";

import { getAllPostsForParishes } from "../../lib/api";

import EventCalendar from "../../components/event-calendars";
import Cta from "../../components/cta";
import Layout from "../../components/layout";
import Banner from "../../components/banner";

import { FacebookIcon, TelegramIcon, PhoneIcon } from "../../components/icons";
import PriestIcon from "../../public/priest.png";

function ParishList({ post }) {
  const router = useRouter();
  const { title, slug, featuredImage, parishs } = post.node;
  const ImageUrl = featuredImage.node.sourceUrl;
  //console.log("propsPl", title);

  return (
    <div onClick={() => router.push(`/parishes/${slug}`)}>
      <div className="w-full transition lg:max-w-full lg:flex hover:shadow-lg lg:mx-auto">
        <div className="flex-none h-48 overflow-hidden text-center bg-cover rounded-t lg:h-auto lg:w-48 xl:w-52 lg:rounded-t-none lg:rounded-l">
          <Image
            width={2000}
            height={1000}
            src={ImageUrl}
            alt="parish image"
            className="object-cover object-center w-full h-full aspect-square"
          />
        </div>
        <div className="flex flex-col justify-between p-4 leading-normal border-b border-l border-r rounded-b lg:w-full border-black/10 lg:border-l-0 lg:border-t lg:border-black/10 lg:rounded-b-none lg:rounded-r">
          <div className="mb-12 text-xl font-bold text-gray-900">{title}</div>
          <div className="flex items-center">
            <Image
              className="w-10 h-10 mr-4 rounded-full"
              src={PriestIcon}
              alt="Avatar of Priest"
            />
            <div className="space-y-2 text-sm">
              <p className="leading-none text-gray-900">{parishs.priestName}</p>
              <span className="inline-flex">
                <a
                  href={parishs.facebook}
                  className="text-gray-500 transition hover:text-gray-500/75 "
                >
                  <FacebookIcon />
                </a>
                <a
                  href={parishs.otherSocialMediaLink}
                  className="ml-2 text-gray-500 transition hover:text-gray-500/75"
                >
                  <PhoneIcon />
                </a>
                <a
                  href={parishs.telegram}
                  className="ml-2 text-gray-500 transition hover:text-gray-500/60"
                >
                  <TelegramIcon />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Parishes({ parishes, events, preview }) {
  const ParishesPost = parishes?.edges;
  const sortedParishesPost = [...ParishesPost].sort(
    (a, b) => a.node.parishs.order - b.node.parishs.order
  );

  //console.log("sorted", sortedParishesPost);

  const eventsPosts = events?.edges;
  return (
    <Layout preview={preview}>
      <div className="hidden lg:block">
        <Banner title="Parish" />
      </div>
      <section className="mx-auto my-20 text-gray-600 body-font max-w-7xl">
        <div className="p-4 md:p-8 bg-blue-100/80 border-black/10 border-b-16 ">
          <h2 className="pb-4 text-3xl font-bold text-gray-900 border-b-2 sm:text-4xl border-black/10 ">
            Parishes
          </h2>
          <div className="grid grid-cols-1 gap-8 py-10 mt-4 ml-auto md:grid-cols-2 xl:max-w-5xl">
            {sortedParishesPost.map((post, index) => {
              return <ParishList key={index} post={post} />;
            })}
          </div>
        </div>
      </section>
      <Cta />
      {eventsPosts.length > 0 && <EventCalendar posts={eventsPosts} />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getAllPostsForParishes(preview);

  return {
    props: {
      parishes: data.parishes,
      events: data.events,
      preview,
    },
    revalidate: 10,
  };
};
