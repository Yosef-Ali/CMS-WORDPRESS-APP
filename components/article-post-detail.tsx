import Image from "next/image";
import SideWidget from "./side-widget";
import SocialMediaLinks from "./social-media-links";
import AudioCard from "./audio-payer";
import { useRouter } from "next/router";

function Card({ post }) {
  console.log("post::", post);
  const router = useRouter();
  const { title, content } = post;
  const ImageUrl = post.featuredImage?.node.sourceUrl;

  function FeaturedImage() {
    return (
      <div>
        <Image
          width={2000}
          height={1000}
          alt="Image"
          src={ImageUrl}
          className="aspect-video w-full object-cover "
        />
      </div>
    );
  }

  function Content() {
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

  return (
    <section className="body-font text-gray-800">
      <div className="container mx-auto mb-24 max-w-2xl">
        <div className="border-b-16 border-black/10 px-4 py-8">
          <h2 className="text-md title-font font-noto border-b-2 border-black/10 pb-4 font-bold text-gray-900 sm:text-xl ">
            {title}
          </h2>
          <FeaturedImage />
          <Content />
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
  //const Posts = posts?.edges;
  console.log("readMoreLink", readMoreLink);

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
