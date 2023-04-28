// CardSmall and CardLarge components are used to render news cards
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { CalenderIcon, CommentIcon } from "./misc/Icons";
import Moment from "react-moment";

// CardSmall component renders a small card with title, content, date, featuredImage and databaseId
export function CardSmall({ news, path }) {
  // useRouter hook is used to access the router object
  const router = useRouter();
  // Destructuring the props
  const { title, content, date, featuredImage, databaseId } = news.node;
  // Get the imageUrl from the featuredImage prop
  const imageUrl = featuredImage?.node.sourceUrl;
  // Get the pathName from the path prop or router.pathname
  const pathName = path || router.pathname;
  return (
    <Link
      href={`${pathName}/${databaseId}`}
      className="flex flex-1 flex-col bg-blue-100/80 shadow hover:shadow-lg"
    >
      <div className="flex-1">
        {
          // Render an Image component with width, height, alt, src, className and priority props
          <Image
            width={2000}
            height={1000}
            alt={""}
            src={imageUrl || "/temp.jpg"}
            className="aspect-video w-full object-cover "
            priority
          />
        }
        {/* Render the title of the news */}
        <div className="text-md title-font font-noto mt-3 px-4 font-medium text-gray-900 line-clamp-1">
          {title}
        </div>
        {/*  Render the content of the news */}
        <div className="font-noto prose px-4 font-light line-clamp-4">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
      {/*  Render the date and comment icon */}
      <div className="my-3 inline-flex items-center gap-2 px-4 text-sm text-gray-400">
        <span>
          <CalenderIcon className="h-4 w-4" />
        </span>
        <Moment format="MMM DD, YYYY">{date}</Moment>
        <div className="ml-auto">
          <CommentIcon className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

// CardLarge component renders a large card with title, content, date, featuredImage and databaseId
export function CardLarge({ news, path }) {
  // useRouter hook is used to access the router object
  const router = useRouter();
  // Destructuring the props
  const { title, content, date, featuredImage, databaseId } = news.node;
  // Get the imageUrl from the featuredImage prop
  const imageUrl = featuredImage?.node.sourceUrl;
  // Get the pathName from the path prop or router.pathname
  const pathName = path || router.pathname;

  return (
    <Link
      href={`${pathName}/${databaseId}`}
      className="grid list-none bg-blue-100/80 p-0 shadow hover:shadow-lg sm:grid-cols-10"
    >
      <div className="sm:relative sm:col-span-5">
        {imageUrl ? (
          // Render an Image component with width, height, alt, src, className and priority props
          <Image
            width={2000}
            height={1000}
            alt={""}
            src={imageUrl}
            className="aspect-video w-full object-cover "
            priority
          />
        ) : (
          // Render an Image component with width, height, alt, src, className and priority props
          <Image
            width={2000}
            height={1000}
            alt={""}
            src="/temp.jpg"
            className="aspect-video w-full object-cover "
            priority
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:col-span-5">
        <div className="flex-1">
          {/*  Render the title of the news */}
          <div className="text-md title-font font-noto font-medium text-gray-900 line-clamp-1">
            {title}
          </div>
          {/*  Render the content of the news */}
          <div className="font-noto mt-3 justify-self-stretch font-light text-gray-900 line-clamp-5">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
        {/*  Render the date and comment icon */}
        <div className="mt-4 inline-flex items-center gap-2 text-sm text-gray-400">
          <span>
            <CalenderIcon className="h-5 w-5" />
          </span>
          <Moment format="MMM DD, YYYY">{date}</Moment>
          <div className="ml-auto">
            <CommentIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
