// Importing necessary components and functions
import { GetStaticProps } from "next";
import { getAllPostsPastoralDepartment } from "../../lib/api";
import Layout from "../../components/layout";
import NewsPageArticleCards from "../../components/news-page-articles";
import EventCalendar from "../../components/event-calendars";
import CTA from "../../components/cta";
import { after } from "node:test";
import MoreButton from "../../components/more-button-no-margin";

// Main function for CatholicTV page
export default function PostsPastoralDepartment({ posts, events, news }) {
  // Declaring variables to store posts
  const pastoralPosts = posts?.edges;
  const eventPosts = events?.edges;
  const newsPosts = news?.edges;

  // Rendering the page with all the components
  return (
    <Layout>
      <section className="mx-auto mt-16 max-w-screen-xl">
        <NewsPageArticleCards
          data={pastoralPosts}
          header="Pastoral Department"
          path="/pastoralDepartment"
          widgetPost={newsPosts}
          title="More Latest News"
          readMoreLink="/news"
          moreUrl="/news"
        />
        <div className="-mt-20 mb-16 px-4">
          <MoreButton
            title="View More"
            moreURL="/pastoralDepartment/pastoral"
          />
        </div>
      </section>
      <CTA />
      <EventCalendar posts={eventPosts} />
    </Layout>
  );
}

// Function to get static props from API
export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await getAllPostsPastoralDepartment({ after });
    return {
      props: {
        posts: data.posts,
        events: data.events,
        news: data.news,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
