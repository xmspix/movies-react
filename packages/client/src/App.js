import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Context from "./utils/context";
import { isMobile } from "./utils/functions";

import Template from "./templates/main";
import Home from "./pages/home";
import Movie from "./pages/movie";
import Collection from "./pages/collection";
import Trending from "./pages/trending";

const App = () => {
  const [state, setState] = useState({
    collection: [],
    menu: !isMobile() ? true : false
  });

  const store = {
    menu: state.menu,
    movies: state.movies,
    collection: state.collection,
    addToCollection: movie =>
      setState({ ...state, ...state.collection.push(movie) }),
    removeFromCollection: TitleID =>
      setState({
        ...state,
        ...state.collection.splice(
          state.collection.findIndex(item => item.TitleID === TitleID),
          1
        )
      }),
    toggleMenu: () =>
      state.menu
        ? setState({ ...state, menu: false })
        : setState({ ...state, menu: true })
  };

  return (
    <Context.Provider value={store}>
      <BrowserRouter>
        <Switch>
          <Template>
            <Route path="/" component={Home} exact />
            <Route path="/movie/:id/:title" component={Movie} exact />
            <Route path="/collection" component={Collection} exact />
            <Route path="/trending" component={Trending} exact />
          </Template>
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
