import React, { useState, useEffect, useContext } from "react";
import context from "../utils/context";
import Spinner from "../components/spinner";
import svg from "../resources/sprite.svg"

const Movie = ({ match: { params } }) => {
  const globalState = useContext(context);
  const [state, setState] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    setState(false);
    fetch("http://localhost:3001/api/movie/" + params.id)
      .then(res => res.json())
      .then(data => {
        setState(data);
      })
      .catch(err => console.log(err));

    return () => {
      isCancelled = true;
    };
  }, [params.id]);

  const trailer = () => {
    let trailer = state.HD.filter(
      itm =>
        itm.definition === "1080p" ||
        itm.definition === "720p" ||
        itm.definition === "480p"
    )[0];

    return (
      <video
        id="backgroundvid"
        poster={state.Trailer.thumbnailUrl}
        autoPlay
        controls
        playsInline
      >
        <source src={trailer.url} type={trailer.mimeType} />
        Your browser does not support the video tag. I suggest you upgrade your
        browser.
      </video>
    );
  };

  if (!state) {
    return <Spinner />;
  } else {
    const isCollected = globalState.collection.filter(
      itm => itm.TitleID === state.TitleID
    )[0]
      ? true
      : false;

    return (
      <div className="movie-container">
        <div className="movie-container__header">
          <img
            src={state.Poster.replace("_V1_", "_V1_UX400_CR0,0,400,550_AL_")}
            alt={state.Title}
            className="movie-container__header--poster"
          />

          <div className="movie-container__header--info">
            <div className="movie-container__header--info-title">
              <h1>{state.Title}</h1>
              <svg
                className={`movie-container__header--info-title--icon ${isCollected ? "icon-active" : null
                  }`}
                onClick={() =>
                  !isCollected ? globalState.addToCollection(state) : null
                }
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                {hover || isCollected ? (
                  <use xlinkHref={svg + "#icon-heart-full"}></use>
                ) : (
                  <use xlinkHref={svg + "#icon-heart-empty"}></use>
                )}
              </svg>
            </div>
            <p className="movie-container__header--description">
              {state.Description}
            </p>
          </div>
        </div>
        <div className="movie-container__trailer">{trailer()}</div>
      </div>
    );
  }
};

export default Movie;
