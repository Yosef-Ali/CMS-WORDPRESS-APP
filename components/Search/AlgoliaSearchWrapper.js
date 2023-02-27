import algoliasearch from "algoliasearch/lite";

import { Configure, InstantSearch } from "react-instantsearch-dom";

// ** Algolia Search Codes ** /
const algoliaClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

//const instant_search = `ArticleNews`

const searchClient = {
  ...algoliaClient,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          query: "",
          params: "",
        })),
      });
    }
    return algoliaClient.search(requests);
  },
};

export default function AlgoliaSearchWrapper({ children, instant_search }) {
  return (
    <InstantSearch searchClient={searchClient} indexName={instant_search}>
      <Configure
        hitsPerPage={5}
        attributesToSnippet={["content:44"]}
        snippetEllipsisText={" [...]"}
      />

      {children}
    </InstantSearch>
  );
}
