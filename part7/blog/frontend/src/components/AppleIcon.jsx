import React from "react";
import { NavLink } from "react-router";
import { triggerNotification } from "../reducer/notificationReducer";
import { useDispatch } from "react-redux";

const AppleIcon = ({ url, src, name }) => {
  const formatedName = name.length > 12 ? name.slice(0, 12) + "..." : name;

  const dispatch = useDispatch();

  const handle = () =>
    !url &&
    dispatch(
      triggerNotification({ content: "Not available yet", type: "info" }),
    );
  if (!url) {
    return (
      <div onClick={handle} className="appleIcon">
        <img src={src} width={75} height={75} />
        <p>{formatedName}</p>
      </div>
    );
  }

  return (
    <NavLink
      to={url}
      className={({ isActive, isPending }) =>
        isPending
          ? "pending"
          : isActive
            ? "active-appleIcon appleIcon"
            : "appleIcon"
      }
    >
      <img src={src} width={75} height={75} />
      <p>{formatedName}</p>
    </NavLink>
  );
};

export default AppleIcon;
