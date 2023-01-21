import Image from 'next/image';
import Link from 'next/link';
import { HamburgIcon } from './icons';
import { NavBarProps } from './interface';
import TopMenu from './top-menu';
import Logo from './logo';
import ACSLOGO from '../public/acs-logo.png';

export default function NavBar({
	menuLinks,
	setMenuOpen,
	menuOpen,
}: NavBarProps) {
	return (
		<nav id='navbar' className='max-w-screen-xl px-4 mx-auto'>
			<div className='flex items-center justify-between'>
				{/*website logo*/}
				<Link href='/' className='z-40 py-2 lg:hidden'>
					<Image src={ACSLOGO} width={40} height={60} alt='logo' />
				</Link>
				<Link href='/' className='hidden py-2 cursor-pointer lg:block'>
					<Logo color={''} />
				</Link>
				<div className='hidden space-x-7 md:flex '>
					{/* {Primary Navigation} */}
					<TopMenu menuLinks={menuLinks} />
				</div>

				{/* {Secondary Navigation} */}
				<div className='items-center hidden space-x-3 md:flex'>
					<Link href='signin' className='px-6 py-2 uppercase rounded bg-primary'>
						Sign in
					</Link>
				</div>

				{/* Hamburger Menu */}
				<div className='md:hidden'>
					<button className='p-3 group' onClick={() => setMenuOpen(!menuOpen)}>
						<HamburgIcon
							className='w-6 h-6 md:hidden group-hover:text-gray-900/60'
							aria-hidden='true'
						/>
					</button>
				</div>
			</div>
		</nav>
	);
}
