import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { CloseIcon, RotatedChevron } from './icons';
import { MobileMenuProps } from './interface';

export default function MobileMenu({
	menuOpen,
	setMenuOpen,
	menuLinks,
	subMenuOpen,
	toggle,
	handleSubmenu,
}: MobileMenuProps) {
	return (
		<Transition
			show={menuOpen}
			enter='transition ease-in-out duration-300 transform'
			enterFrom='-translate-x-full'
			enterTo='translate-x-0'
			leave='transition ease-in-out duration-300 transform'
			leaveFrom='translate-x-0'
			leaveTo='-translate-x-full'
			className='absolute top-0 z-20 w-full h-screen transition duration-700 ease-in-out bg-blue-200 md:hidden'
		>
			<div className='flex flex-col text-black-500'>
				<button
					className='flex justify-end px-4 py-6 '
					onClick={() => setMenuOpen(!menuOpen)}
				>
					<CloseIcon
						className='w-6 h-6 cursor-pointer hover:text-gray-900/60'
						aria-hidden='true'
					/>
				</button>

				<div>
					<ul className='relative flex flex-col w-full text-center transition-all md:flex-row'>
						{menuLinks.map((item) => {
							return (
								<li
									key={item.id}
									className='px-6 py-4 cursor-pointer md:p-4 hover:bg-blue-100 '
								>
									<button
										onClick={() => handleSubmenu(item.id)}
										className='flex items-center w-full group'
									>
										<span className='mr-1'>{item.name}</span>
										{item.submenu.length > 0 && (
											<RotatedChevron
												subMenuOpen={subMenuOpen}
												toggle={toggle}
												linkId={item.id}
											/>
										)}
									</button>
									{subMenuOpen && item.submenu && toggle === item.id ? (
										<ul>
											{item.submenu.map((sub) => {
												//console.log(sub.link);
												return (
													<li key={sub.name} className='px-3 py-2 text-left'>
														<Link
															href={sub.link}
															className='block w-full px-2 py-2 rounded-md hover:bg-blue-300 md:hover:bg-gray-100'
														>
															{sub.name}
														</Link>
													</li>
												);
											})}
										</ul>
									) : null}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</Transition>
	);
}
