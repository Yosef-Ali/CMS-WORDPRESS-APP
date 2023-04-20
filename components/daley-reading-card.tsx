import Link from 'next/link';
import { ChevronRight, ReadingIcon } from './icons';

function Card({ children }) {
	return (
		<div className='flex flex-col min-h-[85px] w-full p-3 transition delay-300 border shadow-sm md:flex-row md:items-center hover:shadow-lg '>
			<div className='items-center justify-center hidden w-2/12 border-r-2 md:flex'>
				<div className='inline-flex items-center justify-center flex-shrink-0 w-12 h-12 text-indigo-500 bg-indigo-100 rounded-full '>
					<ReadingIcon className='w-8 h-8' aria-hidden='true' />
				</div>
			</div>
			<div className='flex-1 '>{children}</div>
		</div>
	);
}

export default function DaleyReadingCard({ posts }) {
	const { databaseId, title } = posts[0].node;
	return (
		<Card>
			<div className='flex'>
				<h2 className='flex-1 text-center text-gray-900 text-md font-noto line-clamp-1 '>
					{title}
				</h2>
				<div className='flex md:h-12 md:w-3/12 md:border-l-2'>
					<Link
						href={`/${''}`}
						className='inline-flex items-center pl-5 text-indigo-500 '
					>
						Read More
						<ChevronRight className='w-4 h-4 ml-2' />
					</Link>
				</div>
			</div>
		</Card>
	);
}
