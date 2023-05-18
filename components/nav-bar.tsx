import Image from "next/image";
import Link from "next/link";
import { HamburgIcon } from "./icons";
import { NavBarProps } from "./interface";
import TopMenu from "./top-menu";
import Logo from "./logo";
import ACSLOGO from "../public/acs-logo.png";
import SearchInputBoxButton from "./Search/input-box-button";

export default function NavBar({
  menuLinks,
  setMenuOpen,
  menuOpen,
  isSearchOpen,
  setIsSearchOpen,
}: NavBarProps) {
  return (
    <nav id="navbar" className="mx-auto max-w-screen-xl px-4">
      <div className="whitespace-no-wrap flex items-center justify-between">
        {/*website logo*/}
        <Link href="/" className="z-40 py-2 md:hidden lg:block xl:hidden">
          <Image src={ACSLOGO} width={40} height={60} alt="logo" priority />
        </Link>
        <Link
          href="/"
          className="hidden cursor-pointer py-2 md:mr-auto md:block lg:hidden xl:block"
        >
          <Logo color={""} />
        </Link>
        <div className="hidden space-x-7 lg:flex ">
          {/* {Primary Navigation} */}
          <TopMenu menuLinks={menuLinks} />
        </div>

        {/* {Secondary Navigation} */}
        <div className="flex space-x-4 xl:ml-auto">
          <div className="flex items-center space-x-3">
            <Link href="#!">
              <SearchInputBoxButton
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />
            </Link>
          </div>
          <Link
            href="https://ethiocatholicaddis.org/wp-login.php"
            className="rounded bg-primary px-6 py-2 uppercase"
          >
            Sign in
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div>
          <button className="group p-3" onClick={() => setMenuOpen(!menuOpen)}>
            <HamburgIcon
              className="h-6 w-6 group-hover:text-gray-900/60 lg:hidden"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
