import React, { useContext } from "react";
import context from "../utils/context";
import MovieList from "../components/movies-list";

const Collection = () => {
  const globalState = useContext(context);

  if (globalState === undefined || !globalState.collection.length > 0) {
    return <div className="center-screen">no collection</div>;
  } else {
    return (
      <div className="movies-list">
        <MovieList array={globalState.collection} buttons={true} />
      </div>
    );
  }
};

export default Collection;
