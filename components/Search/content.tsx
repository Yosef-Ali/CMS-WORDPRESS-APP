import { Hits, Pagination, PoweredBy } from "react-instantsearch-dom";
import { connectStateResults } from "react-instantsearch/connectors";
import Hit from "./Hit.js.js";
import Stats from "./Stats.js.js";
export default connectStateResults(({ searchState, searchResults }) =>
  searchResults && searchResults.nbHits !== 0 ? (
    <>
      <div className="p-3">
        <Stats />
      </div>
      <Hits hitComponent={Hit} />
      <Pagination />
      <PoweredBy />
    </>
  ) : (
    <div className="text-md rounded border-2 border-black/10 p-12">
      No results found for <strong>{searchState.query}</strong>.
      <button className="px-6 py-4" onClick={() => window.location.reload()}>
        Go back
      </button>
    </div>
  )
);
