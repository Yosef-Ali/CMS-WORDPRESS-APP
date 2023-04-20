import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import Layout from "../../components/layout";
import { getAllTeachings } from "../../lib/api";
import EventCalendar from "../../components/event-calendars";
import ArticlesPostListSkeleton from "../../components/skeleton/articles-post-skeleton";

const ArticlesPostList = dynamic(
  () => import("../../components/articles-post"),
  {
    ssr: false,
  }
);

const after = null;
export default function Index({ teachings, itIsTheLORD, events, audios }) {
  const [posts, setPosts] = useState(teachings);
  const [loading, setLoading] = useState(true);
  const itIsTheLORDPosts = itIsTheLORD?.edges;
  const eventsPosts = events?.edges;
  const audioTracks = audios?.edges;

  // Use an effect hook to set the loading status to false after the posts are fetched
  useEffect(() => {
    if (posts) {
      setLoading(false);
    }
  }, [posts]);

  //console.log("catholicTVsPost", catholicTVsPost);
  return (
    <Layout>
      <Banner title="Catholic Teachings" />
      <section className="mx-auto  max-w-screen-xl">
        {loading ? (
          <ArticlesPostListSkeleton />
        ) : (
          <ArticlesPostList
            posts={posts}
            setPosts={setPosts}
            postType="catholicTeachings"
            path="/catholicTeachings"
            header="Catholic's Teachings"
            widgetPost={itIsTheLORDPosts}
            widgetTitle="It is the LORD"
            readMoreLink="/itIsTheLORD"
            moreUrl="/itIsTheLORD"
            audioTracks={audioTracks}
          />
        )}
      </section>
      <CTA />
      {eventsPosts.length > 0 && <EventCalendar posts={eventsPosts} />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllTeachings({ after });

  return {
    props: {
      teachings: data.posts,
      itIsTheLORD: data.itIsTheLORD,
      events: data.events,
      audios: data.podcasts,
    },
    revalidate: 10,
  };
};
