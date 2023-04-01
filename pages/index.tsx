import { GetStaticProps } from "next";

import { getAllPostsForHome } from "../lib/api";
import Layout from "../components/layout";

import EventCalendar from "../components/event-calendars";
import CTA from "../components/cta";
import FeaturedStories from "../components/featured-story";
import WhoWeAre from "../components/who-we-are";
import HomePagePosts from "../components/home-page-posts";
import SectionBlurb from "../components/section-blurb";
import SectionHero from "../components/section-hero";

export default function Index({
  events,
  featuredStories,
  allWhoWeAre,
  daleyReading,
  podcasts,
  catholicTVs,
  ourSpotlight,
  blurbPosts,
  popeMessage,
}) {
  const eventsPosts = events?.edges;
  const featuredStoriesPosts = featuredStories?.edges;
  const allWhoWeArePosts = allWhoWeAre?.edges;
  const daleyReadingPost = daleyReading?.edges;
  const podcastsPost = podcasts?.edges;
  const catholicTVsPost = catholicTVs?.edges;
  const ourSpotlightPost = ourSpotlight?.edges;
  const blurb = blurbPosts?.edges;
  const popeMessagePost = popeMessage?.edges;

  return (
    <Layout>
      <SectionHero posts={popeMessagePost} />
      <SectionBlurb posts={blurb} />
      <HomePagePosts
        daleyReading={daleyReadingPost}
        podcasts={podcastsPost}
        catholicTVs={catholicTVsPost}
        ourSpotlight={ourSpotlightPost}
      />
      {allWhoWeArePosts.length > 0 && <WhoWeAre posts={allWhoWeArePosts} />}
      {featuredStoriesPosts.length > 0 && (
        <FeaturedStories posts={featuredStoriesPosts} />
      )}
      <CTA />
      {eventsPosts.length > 0 && <EventCalendar posts={eventsPosts} />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllPostsForHome();
  //console.log('first', data);
  return {
    props: {
      posts: data.posts,
      events: data.events,
      featuredStories: data.featuredStories,
      allWhoWeAre: data.allWhoWeAre,
      daleyReading: data.daleyReading,
      podcasts: data.podcasts,
      catholicTVs: data.catholicTVs,
      ourSpotlight: data.ourSpotlight,
      blurbPosts: data.blurbPosts,
      popeMessage: data.popeMessage,
    },
    revalidate: 10,
  };
};
