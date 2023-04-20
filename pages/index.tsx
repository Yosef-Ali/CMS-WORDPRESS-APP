<<<<<<< HEAD
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
  dailyReadings,
  podcasts,
  news,
  ourSpotlightVideo,
  ourSpotlight,
  blurbPosts,
  popeMessage,
}) {
  const eventsPosts = events?.edges;
  const featuredStoriesPosts = featuredStories?.edges;
  const allWhoWeArePosts = allWhoWeAre?.edges;
  const dailyReadingsPost = dailyReadings?.edges;
  const podcastsPost = podcasts?.edges;
  const newsPost = news?.edges;
  const ourSpotlightVideoPost = ourSpotlightVideo?.edges;
  const ourSpotlightPost = ourSpotlight?.edges;
  const blurb = blurbPosts?.edges;
  const popeMessagePost = popeMessage?.edges;

  return (
    <Layout>
      <SectionHero posts={popeMessagePost} />
      <SectionBlurb posts={blurb} />
      <HomePagePosts
        dailyReading={dailyReadingsPost}
        podcasts={podcastsPost}
        news={newsPost}
        ourSpotlightVideo={ourSpotlightVideoPost}
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
  console.log("first", data);
  return {
    props: {
      posts: data.posts,
      events: data.events,
      featuredStories: data.featuredStories,
      allWhoWeAre: data.allWhoWeAre,
      dailyReadings: data.dailyReadings,
      podcasts: data.podcasts,
      news: data.news,
      ourSpotlightVideo: data.ourSpotlightVideo,
      ourSpotlight: data.ourSpotlight,
      blurbPosts: data.blurbPosts,
      popeMessage: data.popeMessage,
    },
    revalidate: 10,
  };
=======
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllPostsForHome } from '../lib/api';
import { CMS_NAME } from '../lib/constants';
import EventCalendar from '../components/event-calendars';
import CTA from '../components/cta';
import FeaturedStories from '../components/featured-story';
import WhoWeAre from '../components/who-we-are';
import HomePagePosts from '../components/home-page-postes';
import SectionBlurb from '../components/section-blurb';
import SectionHero from '../components/section-hero';

// export default function Index({ allPosts: { edges }, preview }) {
// 	const heroPost = edges[0]?.node;
// 	const morePosts = edges.slice(1);
// 	// console.log('morePosts', events.edges[0]?.node);
// 	return (
// 		<Layout preview={preview}>
// 			<Head>
// 				<title>Next.js Blog Example with {CMS_NAME}</title>
// 			</Head>
// 			<Container>
// 				<Intro />
// 				{heroPost && (
// 					<HeroPost
// 						title={heroPost.title}
// 						coverImage={heroPost.featuredImage}
// 						date={heroPost.date}
// 						author={heroPost.author}
// 						slug={heroPost.slug}
// 						excerpt={heroPost.excerpt}
// 					/>
// 				)}
// 				{morePosts.length > 0 && <MoreStories posts={morePosts} />}
// 				{/* <EventCalendar posts={morePosts} /> */}
// 			</Container>
// 		</Layout>
// 	);
// }

export default function Index({
	posts,
	events,
	featuredStories,
	allWhoWeAre,
	daleyReading,
	podcasts,
	catholicTVs,
	ourSpotlight,
	blurbPosts,
	popeMessage,
	preview,
}) {
	const morePosts = posts?.edges;
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
		<Layout preview={preview}>
			<SectionHero posts={popeMessagePost} />
			<SectionBlurb posts={blurb} />
			<HomePagePosts
				posts={morePosts}
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

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	const data = await getAllPostsForHome(preview);
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
			preview,
		},
		revalidate: 10,
	};
>>>>>>> aa39fc7f3381656a14f872abda7274d19778faf0
};
