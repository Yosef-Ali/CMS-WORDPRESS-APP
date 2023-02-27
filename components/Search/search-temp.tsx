import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

const algoliaClient = algoliasearch(
  "3W1Q65A6JG",
  "55207a938acf2a33abedfe96d61bb43c"
);

const searchClient = {
  ...algoliaClient,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: "",
          params: "",
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

export const SearchTemp = () => (
  <InstantSearch searchClient={searchClient} indexName="wp_searchable_posts">
    <SearchBox autoFocus />
    <Hits />
  </InstantSearch>
);
