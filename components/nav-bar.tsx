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
        <Link href="/" className="z-40 py-2 lg:hidden">
          <Image src={ACSLOGO} width={40} height={60} alt="logo" />
        </Link>
        <Link href="/" className="hidden cursor-pointer py-2 lg:block">
          <Logo color={""} />
        </Link>
        <div className="hidden space-x-7 md:flex ">
          {/* {Primary Navigation} */}
          <TopMenu menuLinks={menuLinks} />
          <div className="hidden items-center space-x-3 md:flex">
            <Link href="#!" className="">
              <SearchInputBoxButton
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />
            </Link>
          </div>
        </div>

        {/* {Secondary Navigation} */}
        <div className="hidden items-center space-x-3 md:flex">
          <Link
            href="signIn"
            className="rounded bg-primary px-6 py-2 uppercase"
          >
            Sign in
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button className="group p-3" onClick={() => setMenuOpen(!menuOpen)}>
            <HamburgIcon
              className="h-6 w-6 group-hover:text-gray-900/60 md:hidden"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
