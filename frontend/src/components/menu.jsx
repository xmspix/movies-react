import React, { useContext } from "react";
import context from "../utils/context";

const Menu = () => {
  const globalState = useContext(context);

  return (
    <svg
      className="sidebar__links--icon menu"
      onClick={() => globalState.toggleMenu()}
      htmlFor="navi-toggle"
    >
      <use xlinkHref="/public/img/sprite.svg#icon-menu"></use>
    </svg>
  );
};

export default Menu;
