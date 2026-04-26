import React from "react";
import AppleWindow from "../components/AppleWindow";
import { Link } from "react-router";
import { Outlet } from "react-router";
import AppleIcon from "../components/AppleIcon";

const DiskView = () => {
  return (
    <>
      <AppleWindow title={"System Disk"} onClose={"/"}>
        <div className="disk-list">
          <AppleIcon
            src="/icons/folder.png"
            name={"Blog Folder"}
            url={"blogs"}
          />
          <AppleIcon
            src="/icons/folder.png"
            name={"Users Folder"}
            url={"users"}
          />
        </div>
      </AppleWindow>
      <Outlet />
    </>
  );
};

export default DiskView;
