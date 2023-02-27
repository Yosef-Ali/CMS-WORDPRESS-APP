import Link from "next/link";
import { ChevronRight, ReadingIcon } from "./icons";

function Card({ children }) {
  return (
    <div className="flex min-h-[85px] w-full flex-col border p-3 shadow-sm transition delay-300 hover:shadow-lg md:flex-row md:items-center ">
      <div className="hidden w-2/12 items-center justify-center border-r-2 md:flex">
        <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 ">
          <ReadingIcon className="h-8 w-8" aria-hidden="true" />
        </div>
      </div>
      <div className="flex-1 ">{children}</div>
    </div>
  );
}

export default function DaleyReadingCard({ posts }) {
  const { databaseId, title } = posts[0].node;
  return (
    <Card>
      <div className="flex">
        <h2 className="text-md font-noto flex-1 text-center text-gray-900 line-clamp-1 ">
          {title}
        </h2>
        <div className="flex md:h-12 md:w-3/12 md:border-l-2">
          <Link
            href={`/${""}`}
            className="inline-flex items-center pl-5 text-indigo-500 "
          >
            Read More
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
