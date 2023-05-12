import Link from "next/link";
import { ChevronRight } from "./icons";

export default function MoreButton({ title, moreURL }) {
  return (
    <div className="mb-5 mr-auto">
      <Link
        href={moreURL}
        className="inline-flex items-center rounded bg-secondary px-6 py-3 text-white transition hover:bg-secondary/90 hover:shadow-lg"
      >
        {title}
        <ChevronRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}
