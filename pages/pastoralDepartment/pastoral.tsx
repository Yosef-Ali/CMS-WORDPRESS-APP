import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import Layout from "../../components/layout";
import { getAllPostsPastoralDepartment } from "../../lib/api";
import EventCalendar from "../../components/event-calendars";
import ArticlesPostListSkeleton from "../../components/skeleton/articles-post-skeleton";

const ArticlesPostList = dynamic(
  () => import("../../components/articles-post"),
  {
    ssr: false,
  }
);

const after = null;
export default function Index({ pastoral, events, news, audios }) {
  const [posts, setPosts] = useState(pastoral);
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
      <Banner title="Pastoral Department" />
      <section className="mx-auto  max-w-screen-xl">
        {loading ? (
          <ArticlesPostListSkeleton />
        ) : (
          <ArticlesPostList
            posts={posts}
            postType="pastoral"
            setPosts={setPosts}
            path="/pastoralDepartment"
            header="Pastoral Department"
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
  const data = await getAllPostsPastoralDepartment({ after });
  return {
    props: {
      pastoral: data.posts,
      news: data.posts,
      events: data.events,
      audios: data.podcasts,
    },
    revalidate: 10,
  };
};
