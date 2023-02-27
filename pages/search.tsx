import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextPage,
} from "next";
import type { SearchState } from "react-instantsearch-core";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import algoliasearch from "algoliasearch/lite";
import { findResultsState } from "react-instantsearch-dom/server";
import { Search } from "../components/Search/search";
import { createURL, searchStateToURL, pathToSearchState } from "../utils";

// Demo key provided by https://github.com/algolia/react-instantsearch
// const searchClient = algoliasearch(
//   'latency',
//   '6be0576ff61c053d5f9a3225e2a90f76'
// )

const searchClient = algoliasearch(
  "3W1Q65A6JG",
  "55207a938acf2a33abedfe96d61bb43c"
);

const defaultProps = {
  searchClient,
  indexName: "wp_searchable_posts",
};

export default function Page({
  resultsState,
  searchState: initialState,
  userAgent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const debouncedSetState = useRef();
  const [searchState, setSearchState] = useState(initialState);
  const [isSearchOpen, setIsSearchOpen] = useState(true);

  const onSearchStateChange = (state: SearchState) => {
    clearTimeout(debouncedSetState.current);
    (debouncedSetState as any).current = setTimeout(() => {
      const href = searchStateToURL(state);

      router.push(href, href, { shallow: true });
    }, 700);

    setSearchState(state);
    console.log("onSearchStateChange:", state);
  };

  //const query = router.query.q;

  console.log("searchState:", searchState);

  useEffect(() => {
    if (router) {
      router.beforePopState((state: SearchState) => {
        const { url } = state;
        setSearchState(pathToSearchState(url));
        return true;
      });
    }
  }, [router]);

  let osName;
  if (userAgent.indexOf("Windows") != -1) osName = "Windows";
  else if (userAgent.indexOf("Mac OS X") != -1) osName = "Mac OS X";
  else if (userAgent.indexOf("Linux") != -1) osName = "Linux";
  else osName = "Unknown OS";

  return (
    <Search
      {...defaultProps}
      searchState={searchState}
      resultsState={resultsState}
      onSearchStateChange={onSearchStateChange}
      createURL={createURL}
      osName={osName}
      isSearchOpen={isSearchOpen}
      setIsSearchOpen={setIsSearchOpen}
    />
  );
}

interface PageProps {
  searchState: SearchState;
  resultsState: unknown;
  userAgent?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  resolvedUrl,
  req,
}) => {
  const searchState = pathToSearchState(resolvedUrl);
  const resultsState = await findResultsState(Search, {
    ...defaultProps,
    searchState,
  });
  console.log("getServerSideProps", searchState);
  console.log("getServerSidePropsresultsState", resultsState);

  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;

  // Pre-serialize `findResultsState` object return so Next.js' serialization checks pass
  // https://github.com/vercel/next.js/issues/11993
  return {
    props: {
      resultsState: JSON.parse(JSON.stringify(resultsState)),
      searchState,
      userAgent: userAgent,
    },
  };
};
