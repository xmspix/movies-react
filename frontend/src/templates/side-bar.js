import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import context from "../utils/context";

const SideBar = () => {
  const globalState = useContext(context);

  const Notification = () => {
    if (
      globalState.collection === undefined ||
      globalState.collection.length === 0
    ) {
      return null;
    } else {
      return (
        <span className="notification">{globalState.collection.length}</span>
      );
    }
  };

  const nav = [
    {
      text: "All Movies",
      icon: "icon-videocam",
      link: "/"
    },
    {
      text: "Trending Movies",
      icon: "icon-trending-up",
      link: "/trending"
    },
    {
      text: "My Collection",
      icon: "icon-heart-empty",
      link: "/collection",
      notification: true
    }
    // {
    //   text: "Subscription",
    //   icon: "icon-card",
    //   link: "#"
    // },
    // {
    //   text: "Watch Later",
    //   icon: "icon-time",
    //   link: "#"
    // }
  ];

  return (
    <div className={globalState.menu ? "sidebar active" : "sidebar hide"}>
      <div className="sidebar__user-profile">
        <img
          src="/public/img/me.png"
          alt="profile photo"
          className="sidebar__user-profile--image"
        />
        <div className="sidebar__user-info">
          <div className="sidebar__user-info--name">Hi Mark</div>
          <div className="sidebar__user-info--status">Premium Member</div>
        </div>
      </div>
      <div className="sidebar__links">
        <ul>
          {nav.map((itm, x) => (
            <li className="sidebar__links--item" key={x}>
              <NavLink to={itm.link} className="sidebar__links--link">
                <svg className="sidebar__links--icon">
                  <use xlinkHref={`/public/img/sprite.svg#${itm.icon}`}></use>
                </svg>
                <span>{itm.text}</span>
                {itm.notification && <Notification />}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
