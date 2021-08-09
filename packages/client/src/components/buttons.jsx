import React from "react";
import svg from "../resources/sprite.svg"

export const BtnRemove = ({ cb }) => {
  return (
    <button className="btn-sm-red" onClick={cb}>
      X
    </button>
  );
};

export const BtnCollection = ({ cb }) => {
  return (
    <button className="btn-sm-red" onClick={cb}>
      <svg className="icon">
        <use xlinkHref={svg + "#icon-heart-empty"}></use>
      </svg>
    </button>
  );
};
