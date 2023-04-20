<<<<<<< HEAD
import Image from "next/image";
import { ChevronRight } from "./icons";

export default function PopeMessage({ posts }) {
  const { featuredImage, title } = posts[0].node;
  return (
    <div className="flex flex-col rounded border-2 border-gray-300 border-opacity-50 bg-primary/70 p-8 shadow-lg sm:flex-row">
      <div className="mb-4 inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full sm:mr-8 sm:mb-0">
        <Image
          width={2000}
          height={1000}
          src={featuredImage.node.sourceUrl}
          alt="pope image"
          className="mx-auto inline-block h-20 w-20 rounded-full object-cover ring-2 ring-white ring-opacity-50 "
        />
      </div>
      <div className="flex-grow">
        <h1 className="title-font mb-3 text-4xl font-bold text-white">Pope:</h1>
        <h2 className="text-2xl leading-relaxed">{title}</h2>
        <a
          href="#!"
          className="mt-3 inline-flex cursor-pointer items-center text-white hover:text-white/70"
        >
          Read More
          <ChevronRight className={"ml-2 h-4 w-4"} />
        </a>
      </div>
    </div>
  );
=======
import Image from 'next/image';
import { ChevronRight } from './icons';

export default function PopeMessage({ posts }) {
	const { featuredImage, title } = posts[0].node;
	console.log('PopeMessage', posts);
	return (
		<div className='flex flex-col p-8 border-2 border-gray-300 border-opacity-50 rounded shadow-lg sm:flex-row bg-primary/70'>
			<div className='inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-4 rounded-full sm:mr-8 sm:mb-0'>
				<Image
					width={2000}
					height={1000}
					src={featuredImage.node.sourceUrl}
					alt='pope image'
					className='inline-block object-cover w-20 h-20 mx-auto rounded-full ring-2 ring-opacity-50 ring-white '
				/>
			</div>
			<div className='flex-grow'>
				<h1 className='mb-3 text-4xl font-bold text-white title-font'>Pope:</h1>
				<h2 className='text-2xl leading-relaxed'>{title}</h2>
				<a
					href='#!'
					className='inline-flex items-center mt-3 text-white cursor-pointer hover:text-white/70'
				>
					Read More
					<ChevronRight className={'w-4 h-4 ml-2'} />
				</a>
			</div>
		</div>
	);
>>>>>>> aa39fc7f3381656a14f872abda7274d19778faf0
}
