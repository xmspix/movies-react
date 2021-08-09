import React from "react";
import { isMobile } from "./functions";

export default React.createContext({
  menu: !isMobile() ? true : false,
  movies: null,
  collection: null,
  addToCollection: () => {},
  removeFromCollection: () => {},
  toggleMenu: () => {}
});
