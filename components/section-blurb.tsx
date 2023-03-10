import { ParishesIcon } from './icons';
import { CongregationsIcon } from './icons';
import { InstitutionsIcon } from './icons';

function AboutProfile(profile) {
	const { title, content } = profile.node;
	const IconName = () => {
		switch (title) {
			case 'Parishes':
				return <ParishesIcon />;
			case 'Congregations':
				return <CongregationsIcon />;
			default:
				return <InstitutionsIcon />;
		}
	};

	return (
		<div className='flex flex-col w-full p-4 lg:w-1/3'>
			<a
				className='flex-1 p-6 sm:px-16 sm:py-12 lg:p-10 bg-blue-100/80 border-black/10 w-[411] border-b-16 '
				href='#!'
			>
				<div className='flex flex-col'>
					<div className='inline-flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-black/10 '>
						<IconName />
					</div>
					<h3 className='mt-6 text-2xl tracking-tight uppercase'>{title}</h3>

					<p className='mt-2 font-sans'>
						<div dangerouslySetInnerHTML={{ __html: content }} />
					</p>
				</div>
			</a>
		</div>
	);
}

export default function SectionBlurb({ posts }) {
	return (
		<section className='max-w-screen-lg px-4 py-24 mx-auto sm:px-8'>
			<h4 className='mb-5 text-sm font-medium text-center underline uppercase sm:text-lg text-primary underline-offset-4'>
				About Us
			</h4>
			<h2 className='mb-5 text-3xl font-bold text-center text-gray-900 uppercase sm:text-4xl'>
				The Archdioceses of Addis Ababa
			</h2>
			<p className='max-w-lg mx-auto mb-20 text-center text-gray-900'>
				The Ethiopian Catholic Archdiocese of Addis Ababa, officially the
				Metropolitan Sui iuris Archdiocese of Addis Ababa, is the metropolitan see
				of the Ethiopian Catholic Church, a sui iuris metropolitan Eastern Catholic
				Church.
			</p>
			<div className='flex flex-wrap -m-4'>
				{posts.map((profile) => (
					<AboutProfile key={profile.id} {...profile} />
				))}
			</div>
		</section>
	);
}
