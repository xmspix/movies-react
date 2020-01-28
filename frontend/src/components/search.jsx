import React, { setState, useState, useRef } from "react";
import { NavLink, Redirect, Link } from "react-router-dom";

const Search = () => {
  const [state, setState] = useState(false);
  const searchBox = useRef();

  const handleSearch = () => {
    fetch("/api/suggestions/" + searchBox.current.value)
      .then(res => res.json())
      .then(data => {
        setState(data);
      })
      .catch(err => {
        throw err;
      });
  };

  const Results = () => {
    // filter movies only
    const filter = state.d.filter(itm => itm.q === "feature");
    return filter.map(itm => (
      <div className="item-container" key={itm.id}>
        <Link to={`/movie/${itm.id}/${itm.l.replace(/ /g, "-")}`}>
          <figure className="item">
            {itm.i && <img src={itm.i.imageUrl} alt={itm.l} />}
            <div className="info">
              <span className="title">
                {itm.l} ({itm.y})
              </span>
              <span className="actors">{itm.s}</span>
            </div>
          </figure>
        </Link>
      </div>
    ));
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder="Search..."
        className="search"
        ref={searchBox}
        onChange={() => handleSearch()}
      />
      {state ? (
        <div className="autocomplete-items">
          <Results />
        </div>
      ) : null}
    </div>
  );
};

export default Search;
