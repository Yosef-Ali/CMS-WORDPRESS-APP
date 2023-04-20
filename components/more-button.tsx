<<<<<<< HEAD
import Link from "next/link";
import { ChevronRight } from "./icons";

export default function MoreButton({ title, moreURL }) {
  return (
    <div className="mt-5 text-center">
      <Link
        href={moreURL}
        className="inline-flex items-center rounded bg-secondary px-6 py-3 text-white transition hover:bg-secondary/90 hover:shadow-lg"
      >
        {title}
        <ChevronRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
=======
import Link from 'next/link';
import { ChevronRight } from './icons';

export default function MoreButton({ title, moreURL }) {
	return (
		<div className='mt-5 text-center'>
			<Link
				href={moreURL}
				className='inline-flex items-center px-6 py-3 text-white transition rounded bg-secondary hover:bg-secondary/90 hover:shadow-lg'
			>
				{title}
				<ChevronRight className='w-4 h-4 ml-2' />
			</Link>
		</div>
	);
>>>>>>> aa39fc7f3381656a14f872abda7274d19778faf0
}
