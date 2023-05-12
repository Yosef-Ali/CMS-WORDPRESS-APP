import React, { useEffect } from "react";

import { SearchIcon } from "../icons";

// This function returns the name of the operating system based on the
// window.navigator.platform property

const getOs = () => {
  const os = ["Windows", "Mac"]; // add your OS values
  return os.find(
    (v) => (global as any).window?.navigator.platform.indexOf(v) >= 0
  );
};

export default function SearchInputBox({ isSearchOpen, setIsSearchOpen }) {
  const [osName, setOsName] = React.useState("");

  useEffect(() => {
    setOsName(getOs());
  }, []);

  return (
    <div className="flex w-full min-w-0">
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        aria-label="Open search"
        className=" group flex w-full items-center justify-between rounded-lg border px-4 py-2 outline-1 transition-all duration-200 ease-in-out hover:bg-white hover:shadow-md focus:shadow-md focus:outline-none"
        data-segment-message="Clicked on Search"
        data-segment="search"
        title="Open search"
        type="button"
      >
        <div>
          <SearchIcon className="h-6 w-6" />
        </div>

        <div className="ml-6  hidden items-center xl:flex">
          <div className="">
            <div className="from-grey-200 to-grey-300-opacity-60 border-grey-300 shadow-darker text-grey-600  rounded border-b-2 bg-gradient-to-tl">
              <span
                className={`flex h-6 ${
                  osName === "Mac" ? "w-6" : "w-10"
                } items-center justify-center rounded border-t border-l  border-r bg-slate-200 leading-none shadow-md`}
              >
                {osName === "Mac" ? (
                  <span className="block ">
                    <span className="text-sm">⌘</span>
                  </span>
                ) : (
                  <span className="block  ">
                    <span className="text-sm">Ctrl</span>
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className="border-grey-300 shadow-darker text-grey-600  ml-1 rounded border-b-2 ">
            <span className="flex h-6 w-6 items-center justify-center rounded border-t border-l border-r bg-slate-200 leading-none shadow-md">
              <span className="block">
                <span className="text-sm">K</span>
              </span>
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
