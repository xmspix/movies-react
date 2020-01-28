import React from "react";

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
        <use xlinkHref="/public/img/sprite.svg#icon-heart-empty"></use>
      </svg>
    </button>
  );
};
