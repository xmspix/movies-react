import React, { useContext } from "react";
import context from "../utils/context";
import { Link } from "react-router-dom";

import { BtnRemove, BtnCollection } from "./buttons";

const MoviesList = ({ array, buttons }) => {
  const globalState = useContext(context);

  const isCollected = TitleID => {
    return globalState.collection.filter(itm => itm.TitleID === TitleID)[0]
      ? true
      : false;
  };

  return array.map((itm, x) => (
    <div className="movie-card" key={x}>
      <Link to={"/movie/" + itm.TitleID + "/" + itm.Title.replace(/ /g, "-")}>
        <div className="movie-card__poster">
          <img
            src={itm.Poster.replace("_V1_", "_V1_UX400_CR0,0,_AL_")}
            alt={itm.Title}
            className="movie-card__poster--image"
          />
          <div className="overlay">
            <span className=" overlay--info">Year: {itm.Year}</span>
            <span className=" overlay--info">Runtime: {itm.Runtime}</span>
            <span className=" overlay--info">
              Genre: {itm.Genre.replace(/,/g, ", ")}
            </span>
            <span className=" overlay--info">
              Director: {itm.Director.replace(/,/g, ", ")}
            </span>
          </div>
        </div>
        <div className="movie-card__poster--info">
          {itm.Title} ({itm.Year})
        </div>
      </Link>
      {buttons ? (
        <BtnRemove cb={() => globalState.removeFromCollection(itm.TitleID)} />
      ) : (
        !isCollected(itm.TitleID) && (
          <BtnCollection cb={() => globalState.addToCollection(itm)} />
        )
      )}
    </div>
  ));
};

export default MoviesList;
