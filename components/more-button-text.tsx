import Link from "next/link";
import { ChevronRight } from "./icons";

export default function MoreButton({ title, moreURL }) {
  return (
    <Link
      href={moreURL}
      className="mt-4 inline-flex items-center text-secondary/50 "
    >
      {title}
      <ChevronRight className="ml-2 h-4 w-4" />
    </Link>
  );
}
