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
}
