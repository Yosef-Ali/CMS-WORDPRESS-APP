<<<<<<< HEAD
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
=======
import Link from 'next/link';
import { ChevronRight } from './icons';

export default function MoreButton({ title, moreURL }) {
	return (
		<Link
			href={moreURL}
			className='inline-flex items-center mt-4 text-secondary/50 '
		>
			{title}
			<ChevronRight className='w-4 h-4 ml-2' />
		</Link>
	);
>>>>>>> aa39fc7f3381656a14f872abda7274d19778faf0
}
