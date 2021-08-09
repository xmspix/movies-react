import React, { useContext } from "react";
import context from "../utils/context";
import svg from "../resources/sprite.svg"

const Menu = () => {
  const globalState = useContext(context);

  return (
    <svg
      className="sidebar__links--icon menu"
      onClick={() => globalState.toggleMenu()}
      htmlFor="navi-toggle"
    >
      <use xlinkHref={svg + "#icon-menu"}></use>
    </svg>
  );
};

export default Menu;
