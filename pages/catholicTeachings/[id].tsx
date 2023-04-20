import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Image from "next/image";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import CTA from "../../components/cta";
import FeatureStories from "../../components/featured-story";
import {
  getAllCatholicTeachingsWithIds,
  getSingleCatholicTeachingsPost,
} from "../../lib/api";
import { GetYoutubeEmbed } from "../../components/misc/get-youtube-embed";

function FeaturedImage(props) {
  const imageUrl = props.featuredImage?.node.sourceUrl;
  return (
    <div>
      <Image
        width={2000}
        height={1000}
        alt={""}
        src={imageUrl}
        className="aspect-video w-full object-cover "
      />
    </div>
  );
}

function YouTubePlayer(props) {
  const VideoUrl = props.videoSource?.acfvideosource;
  const isVideo = VideoUrl?.slice(0, 17) === "https://youtu.be/";
  const YouTubeUrl = isVideo && GetYoutubeEmbed(VideoUrl);
  const [isLoading, setIsLoading] = useState(true);

  const handleOnLoad = () => {
    setIsLoading(false);
    console.log("handleOnLoad:", "...loaded");
  };

  return (
    <>
      <>
        {isLoading && (
          <div className="aspect-[16/9] w-full animate-pulse bg-gray-200"></div>
        )}
        <iframe
          className="aspect-[16/9] w-full"
          src={YouTubeUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
          allowFullScreen
          onLoad={handleOnLoad}
          style={{ display: isLoading ? "none" : "block" }}
          sandbox="allow-same-origin allow-scripts"
        ></iframe>
      </>
    </>
  );
}

function Content(props) {
  const router = useRouter();
  const { content, title } = props;
  return (
    <div className="max-w-screen-sm pt-6">
      <h2 className="text-md font-noto py-6 font-bold text-gray-900 antialiased">
        {title}
      </h2>
      <div className="font-noto prose text-gray-900 antialiased">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="mt-16 text-center">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center rounded bg-secondary px-6 py-3 text-white transition hover:bg-secondary/90 hover:shadow-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

function Main(props) {
  const YouTubeUrl = props.videoSource?.acfvideosource;
  return (
    <div>
      {!YouTubeUrl ? (
        <FeaturedImage {...props} />
      ) : (
        <YouTubePlayer {...props} />
      )}
      <Content {...props} />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="body-font text-gray-800">
      <div className="container mx-auto mb-24 max-w-2xl">
        <div className="border-b-16 border-black/10 px-4 py-8">
          <h2 className="text-md title-font font-noto border-b-2 border-black/10 pb-4 font-bold text-gray-900 sm:text-xl ">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}

const Hero = () => <div className="h-96 w-full bg-blue-200"></div>;

export default function CatholicTeachings({
  catholicTeaching,
  featuredStories,
  preview,
}) {
  //const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const title = catholicTeaching?.title;

  console.log("catholicTeaching", catholicTeaching);

  const featuredStoriesPosts = featuredStories?.edges;

  if (!router.isFallback && !catholicTeaching?.databaseId) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Banner title="Catholic Teachings" />
      <Section title={title}>{<Main {...catholicTeaching} />}</Section>
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
  const data = await getSingleCatholicTeachingsPost(params?.id);

  return {
    props: {
      preview,
      catholicTeaching: data.post,
      featuredStories: data.featuredStories,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllCatholicTeachingsWithIds();
  console.log("catholicTVs:", posts);
  return {
    paths:
      posts.edges.map(({ node }) => `/catholicTeachings/${node.databaseId}`) ||
      [],
    fallback: true,
  };
};
