import Image from 'next/image';
import PopeMessage from './pope-message';
import HeroImage from '../public/hero.jpeg';

function HeroText() {
	return (
		<>
			<h1 className='text-4xl font-extrabold text-gray-500 sm:text-5xl'>
				Come together as
				<strong className='block font-extrabold text-primary'>
					Church to worship God.
				</strong>
			</h1>

			<p className='max-w-lg mt-4 text-gray-500 sm:leading-relaxed sm:text-xl'>
				As a Catholic Archdioceses, we are focused on being a spiritual and
				faith-centered people.
			</p>

			<div className='mt-8 '>
				<a
					href='#!'
					className='inline-block px-12 py-3 text-sm font-medium text-white rounded shadow bg-primary sm:w-auto hover:bg-primary/70 active:text-rose-500 focus:outline-none focus:ring'
				>
					Learn More
				</a>
			</div>
		</>
	);
}
export default function SectionHero({ posts }) {
	return (
		<div style={{ display: 'grid' }}>
			<Image
				style={{
					gridArea: '1/1',
				}}
				width={2000}
				height={1000}
				alt='Hero Image'
				src={HeroImage}
				className='opacity-25 sm:opacity-100'
			/>
			<div
				style={{
					gridArea: '1/1',
					position: 'relative',
					placeItems: 'center',
					display: 'grid',
				}}
			>
				<div className='absolute inset-0 z-30 bg-gradient-to-r from-blue-200 to-transparent'></div>
				<div className='container z-30 max-w-screen-xl mx-auto'>
					<div className='grid px-4 py-32 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 '>
						<div className='py-8 text-center lg:mr-auto place-self-center md:text-left lg:col-span-7 '>
							<HeroText />
						</div>
						<div className='py-8 place-self-center lg:col-span-5 '>
							<PopeMessage posts={posts} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
