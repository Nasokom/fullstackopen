import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import "../styles/desktop.css";
import { Link } from "react-router";
import AppleIcon from "./AppleIcon";

const DesktopLayout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />

        <div className="desktop-side">
          <AppleIcon
            src={"/icons/floppy-disk-icon.svg"}
            url={"/disk"}
            name={"System Disk"}
          />

          <AppleIcon src={"/icons/floppy-disk-icon.svg"} name={"Trash"} />
          <div className="desktop-icon"></div>
        </div>
      </main>
    </div>
  );
};

export default DesktopLayout;
