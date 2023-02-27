import { GetStaticProps } from "next";
import React from "react";
import ArticlesPostList from "../../components/articles-post";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import Layout from "../../components/layout";
import { getAllEventCalendars } from "../../lib/api";

export default function Index({ events, preview }) {
  const eventsPosts = events?.edges;
  console.log("first", eventsPosts);
  return (
    <Layout preview={preview}>
      <Banner title="Event Calendars" />
      <section className="mx-auto mt-16 max-w-screen-xl">
        <ArticlesPostList
          data={eventsPosts}
          path="/event/eventCalendar/"
          header="Event Calendars"
          widgetPost={""}
          widgetTitle="Latest News"
          readMoreLink="/news/newsArticle/"
          moreUrl="/news/articlesNews"
          tracks={""}
          pageContext={"pageContext"}
          instant_search="wp_posts_event"
        />
      </section>
      <CTA />
      {/* <FeaturedStories /> */}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getAllEventCalendars(preview);
  console.log("data", data);
  return {
    props: {
      events: data,
      preview,
    },
    revalidate: 10,
  };
};
