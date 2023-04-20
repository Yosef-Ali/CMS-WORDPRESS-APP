import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import Layout from "../../components/layout";
import { getAllItIsTheLORD, getAllVideoTeachings } from "../../lib/api";
import EventCalendar from "../../components/event-calendars";
import ArticlesPostListSkeleton from "../../components/skeleton/articles-post-skeleton";

const ArticlesPostList = dynamic(
  () => import("../../components/articles-post"),
  {
    ssr: false,
  }
);

const after = null;
export default function WatchingOurVideos({
  itIsTheLORD,
  catholicTeachings,
  events,
  audios,
}) {
  console.log("videos", itIsTheLORD);
  const [posts, setPosts] = useState(itIsTheLORD);
  const [loading, setLoading] = useState(true);
  const catholicTeachingsPosts = catholicTeachings?.edges;
  const eventsPosts = events?.edges;
  const audioTracks = audios?.edges;

  // Use an effect hook to set the loading status to false after the posts are fetched
  useEffect(() => {
    if (posts) {
      setLoading(false);
    }
  }, [posts]);

  //console.log("filteredPosts", filteredVideos);
  return (
    <Layout>
      <Banner title="Catholic's Teachings" />
      <section className="mx-auto  max-w-screen-xl">
        {loading ? (
          <ArticlesPostListSkeleton />
        ) : (
          <ArticlesPostList
            posts={posts}
            setPosts={setPosts}
            postType="itIsTheLORD"
            path="/itIsTheLORD"
            header="It is the LORD"
            widgetPost={catholicTeachingsPosts}
            widgetTitle="Catholic's Teachings"
            readMoreLink="/catholicTeachings"
            moreUrl="/catholicTeachings"
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
  const data = await getAllItIsTheLORD({ after });
  return {
    props: {
      itIsTheLORD: data.posts,
      catholicTeachings: data.catholicTeachings,
      events: data.events,
      audios: data.podcasts,
    },
    revalidate: 10,
  };
};
