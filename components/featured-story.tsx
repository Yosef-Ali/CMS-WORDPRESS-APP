import MoreButton from './more-button';
import SectionTitle from './section-title';

export default function FeatureStories({ posts }) {
	return (
		<section className='mx-auto text-gray-600 body-font max-w-7xl'>
			<div className='container px-5 py-20 mx-auto '>
				<div className='p-8 bg-blue-100/80 border-black/10 border-b-16 '>
					<SectionTitle>Featured Stories</SectionTitle>
					<div className='flex flex-wrap -m-4 '>
						{posts.map(({ node }) => {
							const { databaseId, title, content } = node;
							return (
								<div className='lg:w-1/3' key={databaseId}>
									<a href='#!' className=''>
										<div className='px-6 py-12'>
											<h2 className='mb-3 text-xl font-medium text-gray-900 title-font sm:text-2xl font-noto line-clamp-2'>
												{title}
											</h2>
											<div className='mb-3 prose font-noto line-clamp-5 '>
												<div dangerouslySetInnerHTML={{ __html: content }} />
											</div>
										</div>
									</a>
								</div>
							);
						})}
					</div>
					<MoreButton title={'Load More'} moreURL={'/featureStories'} />
				</div>
			</div>
		</section>
	);
}
