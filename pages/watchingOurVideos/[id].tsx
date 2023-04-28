import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import FeatureStories from "../../components/featured-story";
import { getAllPostsWithIds, getSinglePost } from "../../lib/api";
import Section from "../../components/section-single-page";
import Main from "../../components/main-single-page";

const Hero = () => <div className="h-96 w-full bg-blue-200"></div>;

export default function WatchingOurVideos({ news, featuredStories, preview }) {
  const router = useRouter();
  const { title, content, featuredImage } = news;

  const featuredStoriesPosts = featuredStories?.edges;

  if (!router.isFallback && !news?.databaseId) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content.slice(0, 50)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.slice(0, 180)} />
        <meta property="og:image" content={featuredImage?.node.sourceUrl} />
      </Head>

      <Banner title="Catholic's Teachings" />
      <Section title={title}>{<Main {...news} />}</Section>
      <CTA />
      {featuredStoriesPosts?.length > 0 && (
        <FeatureStories posts={featuredStoriesPosts} />
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getSinglePost(params?.id);

  return {
    props: {
      preview,
      news: data.post,
      featuredStories: data.featuredStories,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPostsWithIds();
  return {
    paths:
      posts.edges.map(({ node }) => `/watchingOurVideos/${node.databaseId}`) ||
      [],
    fallback: true,
  };
};
