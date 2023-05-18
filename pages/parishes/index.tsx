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
import Head from "next/head";

function ParishList({ post }) {
  const router = useRouter();
  const { title, slug, featuredImage, parishs } = post.node;
  const ImageUrl = featuredImage.node.sourceUrl;

  return (
    <div onClick={() => router.push(`/parishes/${slug}`)}>
      <div className="w-full transition hover:shadow-lg lg:mx-auto lg:flex lg:max-w-full">
        <div className="h-48 flex-none overflow-hidden rounded-t bg-cover text-center lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l xl:w-52">
          <Image
            width={2000}
            height={1000}
            src={ImageUrl}
            alt="parish image"
            className="aspect-square h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-between rounded-b border-b border-l border-r border-black/10 p-4 leading-normal lg:w-full lg:rounded-b-none lg:rounded-r lg:border-l-0 lg:border-t lg:border-black/10">
          <div className="mb-12 text-xl font-bold text-gray-900">{title}</div>
          <div className="flex items-center">
            <Image
              className="mr-4 h-10 w-10 rounded-full"
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

export default function Parishes({ parishes, events }) {
  const ParishesPost = parishes?.edges;
  const sortedParishesPost = [...ParishesPost].sort(
    (a, b) => a.node.parishs.order - b.node.parishs.order
  );

  const eventsPosts = events?.edges;
  return (
    <Layout>
      <div className="hidden lg:block">
        <Banner title="Parish" />
      </div>
      <section className="body-font mx-auto my-20 max-w-7xl text-gray-600">
        <div className="border-b-16 border-black/10 bg-blue-100/80 p-4 md:p-8 ">
          <h2 className="border-b-2 border-black/10 pb-4 text-3xl font-bold text-gray-900 sm:text-4xl ">
            Parishes
          </h2>
          <div className="mt-4 ml-auto grid grid-cols-1 gap-8 py-10 md:grid-cols-2 xl:max-w-5xl">
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

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllPostsForParishes();

  return {
    props: {
      parishes: data.parishes,
      events: data.events,
    },
    revalidate: 10,
  };
};
