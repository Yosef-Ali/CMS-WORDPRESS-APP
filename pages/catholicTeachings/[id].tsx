import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import FeatureStories from "../../components/featured-story";
import {
  getAllCatholicTeachingsWithIds,
  getSingleCatholicTeachingsPost,
} from "../../lib/api";
import Section from "../../components/section-single-page";
import Main from "../../components/main-single-page";

interface Post {
  title: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

interface FeaturedStoryNode {
  content: string;
  title: string;
  databaseId: number; // change this from string to number
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

interface FeaturedStory {
  node: FeaturedStoryNode;
}

interface CatholicTeachingsProps {
  catholicTeaching?: Post;
  featuredStories?: FeaturedStory[];
  preview?: boolean;
}
const Hero = () => <div className="h-96 w-full bg-blue-200"></div>;

export default function CatholicTeachings({
  catholicTeaching,
  featuredStories,
  preview = false,
}: CatholicTeachingsProps) {
  const router = useRouter();

  const { title, content, featuredImage } = catholicTeaching ?? {};
  const featuredImageSrc = featuredImage?.node.sourceUrl;

  if (!catholicTeaching?.title || !content) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content.slice(0, 50)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.slice(0, 180)} />
        <meta property="og:image" content={featuredImageSrc} />
      </Head>
      <Banner title="Catholic Teachings" />
      <Section title={title}>
        <Main content={content} featuredImageSrc={featuredImageSrc} />
      </Section>
      <CTA />
      {featuredStories?.length > 0 && (
        <FeatureStories stories={featuredStories} />
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<CatholicTeachingsProps> = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getSingleCatholicTeachingsPost(params?.id);

  return {
    props: {
      preview,
      catholicTeaching: data.post ?? null,
      featuredStories: data.featuredStories?.edges ?? null,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllCatholicTeachingsWithIds();

  const paths = posts.edges.map(({ node }) => ({
    params: { id: String(node.databaseId) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
