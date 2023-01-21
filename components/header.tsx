import { useState, useEffect } from 'react';
import NavBar from './nav-bar';
import MobileMenu from './mobile-menu';
import { menuLinks } from './menu-links';

export default function Header() {
	const [scrollActive, setScrollActive] = useState(false);
	const [bgActive, setBgActive] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [subMenuOpen, setSubMenuOpen] = useState(false);
	const [toggle, setToggle] = useState(null);

	useEffect(() => {
		const currentPage = window.location.pathname;
		window.addEventListener('scroll', () => {
			setScrollActive(window.scrollY > 20);
			currentPage === '/'
				? setBgActive(window.scrollY > 500)
				: setBgActive(window.scrollY > 70);
		});
	}, []);

	const handleSubmenu = (menuId: number) => {
		setSubMenuOpen(!subMenuOpen);
		setToggle(menuId);
	};

	return (
		<header
			className={
				'fixed top-0 w-full z-40 bg-white-500 transition-all ' +
				(scrollActive ? ' shadow-md pt-0' : ' ') +
				(bgActive ? ' bg-white' : ' ')
			}
		>
			<NavBar
				menuLinks={menuLinks}
				setMenuOpen={setMenuOpen}
				menuOpen={menuOpen}
			/>

			{/* Mobile Menu */}
			<MobileMenu
				menuOpen={menuOpen}
				setMenuOpen={setMenuOpen}
				menuLinks={menuLinks}
				subMenuOpen={subMenuOpen}
				toggle={toggle}
				handleSubmenu={handleSubmenu}
			/>
		</header>
	);
}
