import Image from "next/image";
import SideWidget from "./side-widget";
import SocialMediaLinks from "./social-media-links";
import AudioCard from "./audio-payer";
//import FeaturedImage from "./featured-image";
import Content from "./content-single-page";

function FeaturedImage({ featuredImageSrc }) {
  // { featuredImageSrc }
  return (
    <div className="relative h-64 w-full sm:h-96 lg:h-full">
      <Image
        width={2000}
        height={1000}
        alt="image"
        priority
        src={featuredImageSrc}
        className="aspect-video w-full object-cover "
      />
    </div>
  );
}

function Card({ post }) {
  const { title, featuredImage } = post;
  const featuredImageSrc = featuredImage?.node.sourceUrl;
  return (
    <section className="body-font text-gray-800">
      <div className="container mx-auto mb-24 max-w-2xl">
        <div className="border-b-16 border-black/10 px-4 py-8">
          <h2 className="text-md title-font font-noto border-b-2 border-black/10 pb-4 font-bold text-gray-900 sm:text-xl ">
            {title}
          </h2>
          <FeaturedImage featuredImageSrc={featuredImageSrc} />
          <Content {...post} />
        </div>
      </div>
    </section>
  );
}

export default function ArticlesPostDetail({
  post,
  widgetPosts,
  widgetTitle,
  readMoreLink,
  moreUrl,
  audioTracks,
}) {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-16">
      <div className="xl-Space-x-4 flex flex-col gap-4 md:gap-0 lg:flex-row  ">
        <div className="relative space-y-4  lg:w-2/3">
          <Card post={post} />
        </div>
        <div className="flex flex-col items-center lg:w-1/3">
          <SideWidget
            posts={widgetPosts}
            title={widgetTitle}
            readMoreLink={readMoreLink}
            moreButtonUrl={moreUrl}
          />
          {audioTracks && <AudioCard tracks={audioTracks} />}

          <SocialMediaLinks color="secondary" />
        </div>
      </div>
    </div>
  );
}
