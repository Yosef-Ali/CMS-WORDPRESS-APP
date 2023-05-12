import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import Layout from "../../components/layout";
import {
  getAllFeaturedStories,
  getAllPostsPastoralDepartment,
  getAllPostsSocialDepartment,
} from "../../lib/api";
import EventCalendar from "../../components/event-calendars";
import ArticlesPostListSkeleton from "../../components/skeleton/articles-post-skeleton";
import MoreButton from "../../components/more-button";

const ArticlesPostList = dynamic(
  () => import("../../components/articles-post"),
  {
    ssr: false,
  }
);

const after = null;
export default function Index({ social, events, news, audios }) {
  const [posts, setPosts] = useState(social);
  const [loading, setLoading] = useState(true);
  const newsPost = news?.edges;
  const eventsPosts = events?.edges;
  const audioTracks = audios?.edges;

  useEffect(() => {
    if (posts) {
      setLoading(false);
    }
  }, [posts]);

  return (
    <Layout>
      <Banner title="Social Department" />
      <section className="mx-auto  max-w-screen-xl">
        {loading ? (
          <ArticlesPostListSkeleton />
        ) : (
          <ArticlesPostList
            posts={posts}
            postType="social"
            setPosts={setPosts}
            path="/socialDepartment"
            header="Social Department"
            widgetPost={newsPost}
            widgetTitle="Recent News"
            readMoreLink="/news"
            moreUrl="/news"
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
  const data = await getAllPostsSocialDepartment({ after });
  return {
    props: {
      social: data.posts,
      news: data.posts,
      events: data.events,
      audios: data.podcasts,
    },
    revalidate: 10,
  };
};
