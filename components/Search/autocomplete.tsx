 // algolia search component with next.js
 // type SearchProps = {
  //   searchClient: SearchClient;
  //   indexName: string;
  //   resultsState?: SearchResults;
  //   searchState?: SearchState;
  //   onSearchStateChange?: (searchState: SearchState) => void;
  //   createURL?: (searchState: SearchState) => string;
  //   onSearchParameters?: (searchParameters: SearchParameters) => void;
  //   onSearch?: (searchState: SearchState) => void;
  //   onResults?: (searchState: SearchState, results: SearchResults) => void;
  //   onResult?: (searchState: SearchState, result: SearchResults) => void;
  //   onStateChange?: (searchState: SearchState) => void;
  //   onInternalStateUpdate?: (searchState: SearchState) => void;
  //   onRedirect?: (searchState: SearchState) => void;

import { InstantSearch } from "react-instantsearch-hooks-web"

}

const Search = ({
  searchClient,
  indexName,
  resultsState,
  searchState,
  onSearchStateChange,
  createURL,
  onSearchParameters,
  onSearch,
  onResults,
  onResult,
  onStateChange,
  onInternalStateUpdate,
  onRedirect,
}: SearchProps) => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      resultsState={resultsState}
      searchState={searchState}
      onSearchStateChange={onSearchStateChange}
      createURL={createURL}
      onSearchParameters={onSearchParameters}
      onSearch={onSearch}
      onResults={onResults}
      onResult={onResult}
      onStateChange={onStateChange}
      onInternalStateUpdate={onInternalStateUpdate}
      onRedirect={onRedirect}
      >
      <Configure hitsPerPage={10} />
      <SearchBox />
      <Hits />

      </InstantSearch>