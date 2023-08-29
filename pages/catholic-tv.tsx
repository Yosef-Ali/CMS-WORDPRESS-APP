// Importing necessary components and functions
import { GetStaticProps } from "next";
import { getAllPostsCatholicTV } from "../lib/api";
import Layout from "../components/layout";
import NewsPageVideoCards from "../components/news-page-video-cards";
import NewsPageArticleCards from "../components/news-page-articles";
import EventCalendar from "../components/event-calendars";
import CTA from "../components/cta";
import Banner from "../components/banner";
import BannerPax from "../components/banner-pax";

// Main function for CatholicTV page
export default function CatholicTV({
  videoNews,
  newsArticles,
  catholicTeachingsVideo,
  catholicTeachingsArticles,
  itIsTheLORD,
}) {
  // Declaring variables to store posts
  const videoNewsPosts = videoNews?.edges;
  const newsArticlesPosts = newsArticles?.edges;
  const catholicTeachingVideoPosts = catholicTeachingsVideo?.edges;
  const catholicTeachingsArticlePosts = catholicTeachingsArticles?.edges;
  const itIsTheLORDPosts = itIsTheLORD?.edges;

  // Rendering the page with all the components
  return (
    <Layout>
      {/* <section className="mx-auto mt-16 max-w-screen-xl">
        <BannerPax />
        <NewsPageVideoCards
          data={videoNewsPosts}
          header="CATHOLIC TV NEWS"
          viewMoreLink="/news"
        />
        <NewsPageArticleCards
          data={newsArticlesPosts}
          header="CATHOLIC TV NEWS ARTICLES"
          path="/news"
          widgetPost={newsArticlesPosts.slice(4, 7)}
          title="More Latest News"
          readMoreLink="/news"
          moreUrl="/news"
        />
      </section> */}
      <CTA />
      <section className="mx-auto max-w-screen-xl">
        <NewsPageVideoCards
          data={catholicTeachingVideoPosts}
          header="CATHOLIC Teachings"
          viewMoreLink="/catholicTeachings"
        />

        {/* <NewsPageArticleCards
          data={catholicTeachingsArticlePosts}
          header="Catholic Teachings"
          path="/catholicTeachings"
          widgetPost={itIsTheLORDPosts.slice(0, 4)}
          title="It is the LORD"
          readMoreLink="/itIsTheLORD"
          moreUrl="/itIsTheLORD"
        /> */}
      </section>
    </Layout>
  );
}

// Function to get static props from API
export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllPostsCatholicTV();

  return {
    props: {
      videoNews: data.catholicTvVideoNews,
      newsArticles: data.newsArticles,
      catholicTeachingsVideo: data.catholicTeachingsVideo,
      catholicTeachingsArticles: data.catholicTeachingsArticles,
      itIsTheLORD: data.itIsTheLORD,
    },
    revalidate: 10,
  };
};
