import React from "react";
import "../styles/window.css";
import { useDispatch } from "react-redux";
import { triggerNotification } from "../reducer/notificationReducer";
import { useNavigate } from "react-router";

const AppleWindow = ({ title, onClose, children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    if (typeof onClose == "string") {
      navigate(onClose);
      return;
    }
    onClose();
  };

  return (
    <div className={`apple-window`}>
      <div className="apple-header">
        <div className="apple-pattern">
          {title && <h1 className={"small-title"}>{title}</h1>}
          {onClose && <button onClick={handleClose}></button>}
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="apple-body">{children}</div>
    </div>
  );
};

export default AppleWindow;
