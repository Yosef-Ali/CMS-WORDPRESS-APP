import { useState } from "react";
import {
  RefinementList,
  Hits,
  Configure,
  Highlight,
  Pagination,
  InstantSearch,
  connectSearchBox,
} from "react-instantsearch-dom";
import SearchBoxOverlay from "./search-input-box-overlay";

const SearchBox = ({ currentRefinement, refine }) => {
  //const [currentRefinementValue, setCurrentRefinement]=useState(InputValue?)
  const handleChange = (event) => {
    // event.currentTarget.value = "";
    refine(event.currentTarget.value);
  };
  return (
    <input
      type="search"
      value={currentRefinement || ""}
      onChange={(event) => refine(event.currentTarget.value)}
      //onChange={handleChange}
      className="w-full border p-4"
    />
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

const HitComponent = ({ hit }: any) => {
  //console.log(hit);
  return (
    <div className="hit">
      {/* <div>
    <div className="hit-picture">
      <img src={`${hit.image}`} />
    </div>
  </div> */}
      <div className="hit-content">
        <div className="hit-type">
          <Highlight attribute="post_title" hit={hit} />
        </div>
        <div className="hit-description">
          <Highlight attribute="content" hit={hit} />
        </div>
      </div>
    </div>
  );
};

export function Search(props) {
  //const userAgent = navigator.userAgent;

  const InputValue = props.searchState?.q;

  return (
    <InstantSearch {...props}>
      <Configure hitsPerPage={12} />
      <header>
        <h1>React InstantSearch + Next.js</h1>
        <SearchBoxOverlay {...props}>
          <CustomSearchBox />
        </SearchBoxOverlay>
        {/* <CustomSearchBox InputValue={InputValue} /> */}
      </header>
      <main>
        {/* <div className="menu">
          <RefinementList attribute="categories" />
        </div> */}
        {props.osName}

        <div className="results">
          <Hits hitComponent={HitComponent} />
        </div>
      </main>
      <footer>
        <Pagination />
      </footer>
    </InstantSearch>
  );
}
