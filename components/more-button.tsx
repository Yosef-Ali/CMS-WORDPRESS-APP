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
}
