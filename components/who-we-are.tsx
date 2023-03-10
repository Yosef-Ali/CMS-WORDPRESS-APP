import React from 'react';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from './icons';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function WhoWeAre({ posts }) {
	return (
		<section className='px-4 py-24 mx-auto max-w-screen-lx sm:px-8 bg-blue-100/80'>
			<div className='max-w-screen-lg mx-auto'>
				<div className='container mx-auto '>
					<h2 className='mb-5 text-3xl font-bold text-center text-gray-900 uppercase sm:text-4xl'>
						Who We Are
					</h2>
					<p className='max-w-md mx-auto mb-20 text-center text-gray-900'>
						We are Ethiopian Catholic Archdioceses of Addis Abeba, officially the
						Metropolitan sui iuris Archdioceses of Addis Abeba.
					</p>
					<Tab.Group>
						<Tab.List className='md:flex bg-blue-900/20'>
							{posts.map(({ node }) => {
								const { databaseId, title } = node;
								return (
									<Tab
										key={databaseId}
										className={({ selected }) =>
											classNames(
												'tab',
												selected
													? 'outline-none tabSelected'
													: 'text-blue-100  transition hover:bg-secondary hover:text-white'
											)
										}
									>
										<span>{title}</span>
									</Tab>
								);
							})}
						</Tab.List>
						<Tab.Panels>
							{posts.map(({ node }) => {
								const { databaseId, title, content, featuredImage } = node;
								return (
									<Tab.Panel key={databaseId}>
										<div className='relative'>
											<Image
												width={2000}
												height={1000}
												className='object-cover w-full h-[580px] '
												src={featuredImage?.node.sourceUrl}
												alt={`${title} image`}
											/>
											<div className='absolute z-10 max-w-xs p-6 bg-white/90 top-24 right-6'>
												<h2 className='mb-5 text-2xl'>{title}</h2>
												<div dangerouslySetInnerHTML={{ __html: content }} />
												<Link
													href={'#'}
													className='inline-flex items-center mt-4 text-gray-400 cursor-none'
												>
													Learn More
													<ChevronRight className='w-4 h-4 ml-2' />
												</Link>
											</div>
										</div>
									</Tab.Panel>
								);
							})}
						</Tab.Panels>
					</Tab.Group>
				</div>
			</div>
		</section>
	);
}
