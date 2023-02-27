import React, { Fragment, useState } from "react";
import { Router } from "next/router";
import algoliasearch from "algoliasearch/lite";

import {
  InstantSearch,
  Highlight,
  useHits,
  useSearchBox,
  Configure,
} from "react-instantsearch-hooks-web";

import { Combobox, Dialog, Transition } from "@headlessui/react";
import {
  DocumentIcon,
  EscIcon,
  MusicIcon,
  PodcastIcon,
  SearchIcon,
  YouTubeIcon,
} from "../icons";

const searchClient = algoliasearch(
  "3W1Q65A6JG",
  "55207a938acf2a33abedfe96d61bb43c"
);

const CategoryIcon = (props) => {
  const { Category } = props;
  let categoryString = Category?.toString();
  switch (categoryString) {
    case "Music":
      return <MusicIcon className="h-4 w-4" />;
    case "Podcast":
      return <PodcastIcon className="h-4 w-4" />;
    case "CatholicTV":
      return <YouTubeIcon />;
    default:
      return <DocumentIcon className="h-4 w-4" />;
  }
};

function CustomHits() {
  const { hits, results } = useHits();
  const { exhaustiveNbHits } = results;
  return (
    <>
      {exhaustiveNbHits &&
        hits.map((hit, i) => {
          const Category = hit.taxonomies.category;
          return (
            <Combobox.Option
              value={hits}
              key={i}
              className="max-h-96 overflow-y-auto px-4 text-sm"
            >
              {({ active }) => (
                <div
                  className={`space-x-1 rounded-md p-4 last-of-type:mb-3 ${
                    active ? "bg-slate-400" : "bg-white"
                  }`}
                >
                  <span
                    className={`font-medium ${
                      active ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <h2 className="font-noto font-semibold">
                      <Highlight hit={hit} attribute="post_title" />
                    </h2>
                    <p className="font-noto pt-3 text-xs opacity-70 line-clamp-3">
                      <Highlight hit={hit} attribute="content" />
                    </p>
                  </span>
                  <span className="flex justify-between pt-3 text-xs opacity-70">
                    <span>From: {Category}</span>
                    <div className="flex space-x-2">
                      <span>
                        <CategoryIcon Category={Category} />
                      </span>
                      <span>{`${hit.post_date_formatted}`}</span>
                    </div>
                  </span>
                </div>
              )}
            </Combobox.Option>
          );
        })}
    </>
  );
}

export function AlgoliaSearch({ isSearchOpen, setIsSearchOpen, command }) {
  const [query, setQuery] = useState("");

  function CustomSearchBox() {
    const { refine } = useSearchBox();

    return (
      <div className="flex items-center px-4 ">
        <SearchIcon className="h-6 w-6 text-gray-500" />
        <Combobox.Input
          onChange={(event) => {
            refine(event.target.value);
          }}
          className="h-12  w-full overflow-hidden border-0 bg-transparent pl-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0 "
          placeholder="Search"
          autoFocus={true}
        />
        <button
          onClick={() => setIsSearchOpen(false)}
          className="rounded border p-1 hover:shadow"
        >
          <EscIcon />
        </button>
      </div>
    );
  }

  return (
    <div>
      <InstantSearch
        searchClient={searchClient}
        indexName="wp_searchable_posts"
      >
        <Configure hitsPerPage={4} />
        <Transition.Root
          show={isSearchOpen}
          as={Fragment}
          //afterLeave={() => setQuery("")}
        >
          <Dialog
            onClose={setIsSearchOpen}
            className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[25vh]"
          >
            <Transition.Child
              enter="duration-300 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500/70" />
            </Transition.Child>
            <Transition.Child
              enter="duration-300 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Combobox
                onChange={(command) => {
                  // we have access to the selected command
                  // a redirect can happen here or any action can be executed
                  setIsSearchOpen(false);
                }}
                as="div"
                className="relative mx-auto max-w-2xl divide-y divide-gray-300 rounded-xl bg-white  shadow-2xl ring-1 ring-black/5"
              >
                <div className="">
                  <CustomSearchBox />
                  <Combobox.Options static>
                    <CustomHits />
                  </Combobox.Options>
                </div>
              </Combobox>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      </InstantSearch>
    </div>
  );
}
