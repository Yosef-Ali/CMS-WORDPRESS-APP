import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Combobox, Dialog, Transition } from "@headlessui/react";

import algoliasearch from "algoliasearch/lite";
import SearchErrorToast from "./Search-Error-Toast";

import {
  InstantSearch,
  Highlight,
  useHits,
  useSearchBox,
  Configure,
  Pagination,
  PoweredBy,
  useInstantSearch,
} from "react-instantsearch-hooks-web";

import {
  DocumentIcon,
  EscIcon,
  MusicIcon,
  PodcastIcon,
  SearchIcon,
} from "../icons";

const searchClient = algoliasearch(
  "3W1Q65A6JG",
  "55207a938acf2a33abedfe96d61bb43c"
);

// This is a functional Component that accepts one prop called 'Category'
const CategoryIcon = (props) => {
  const { Category } = props;

  // The category string is extracted from the Category prop and converted to lowercase then checked if it contains "catholic tv" text. If yes, replace it with "CatholicTV"
  let categoryString = Category?.toString();
  if (categoryString?.toLowerCase().includes("catholic tv")) {
    categoryString = "CatholicTV";
  }

  // A switch statement is used to return different icons depending on the value of the "categoryString"
  switch (categoryString) {
    case "Music":
      return <MusicIcon className="h-4 w-4" />;
    case "Podcast":
      return <PodcastIcon className="h-4 w-4" />;
    case "CatholicTV":
      return <YouTubeIcon />;
    default:
      // If none of the cases above match the 'categoryString', a 'DocumentIcon' component with some classes will be returned.
      return <DocumentIcon className="h-4 w-4" />;
  }
};

function CustomHits(props) {
  const { setPaginationShow } = props;
  const { hits, results } = useHits();
  const { exhaustiveNbHits } = results;
  const router = useRouter();

  const handleClick = (hit) => {
    const regex = /(?<=\/)[^\/]+(?=\/)/g;

    const permalink = hit.permalink.match(regex);

    // A switch statement to handle different cases of hit.post_type
    switch (hit.post_type) {
      case "parishes":
        // logging permalink

        // pushing a new route into router instance based on the hit post type and permalink
        return router.push(`/${hit.post_type}/${permalink[2]}`);
        break;
      case "institutions":
      case "the_curia_list":
      case "congregation":
        // pushing a new route into router instance based on the hit post type
        return router.push(`/${hit.post_type}`);
        break;
      case "event":
        // pushing a new route into router instance for event with hit post id
        return router.push(`/events/${hit.post_id}`);
        break;
      case "featured_stories":
      case "catholic_tv":
      case "podcast":
      case "pope-message":
      case "our_spotlight":
        // pushing a new route into router instance based on the hit post type and post id
        return router.push(`/${hit.post_type}/${hit.post_id}`);
        break;
    }
  };

  const PaginationShow = exhaustiveNbHits && results.nbPages > 1;

  return (
    <>
      {exhaustiveNbHits &&
        results.hits.length > 0 &&
        hits.map((hit: any, i: number) => {
          const Category = hit.taxonomies.category || hit.post_type_label;
          return (
            <Combobox.Option
              value={hit}
              key={i}
              className="max-h-96 overflow-y-auto px-4 text-sm"
              onClick={() => handleClick(hit)}
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
      {PaginationShow ? (
        <div className=" p-2">
          <Pagination />
        </div>
      ) : null}
    </>
  );
}

function NoResultsBoundary({ children, fallback }) {
  const { results } = useInstantSearch();
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

function NoResults() {
  const { indexUiState } = useInstantSearch();

  return (
    <div className="flex justify-between p-4">
      <p>
        No results for <q>{indexUiState.query}</q>.
      </p>
      <PoweredBy />
    </div>
  );
}

export function AlgoliaSearch({ isSearchOpen, setIsSearchOpen, command }) {
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
          className="rounded border p-2 hover:shadow"
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
            className="fixed inset-0 z-40 overflow-y-auto p-4 pt-[25vh]"
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
                <div>
                  <SearchErrorToast />
                  <CustomSearchBox />
                  <Combobox.Options static>
                    <NoResultsBoundary fallback={<NoResults />}>
                      <CustomHits />
                    </NoResultsBoundary>
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

function YouTubeIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-youtube"
      viewBox="0 0 16 16"
    >
      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
    </svg>
  );
}
