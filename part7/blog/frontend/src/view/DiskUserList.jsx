import React from "react";
import AppleWindow from "../components/AppleWindow";
import AppleIcon from "../components/AppleIcon";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
const DiskUserList = () => {
  const data = useSelector(({ users }) => users);
  return (
    <>
      <AppleWindow title={"User Folder"} onClose={"/disk"}>
        <div className="flex">
          {data &&
            data.map((user) => {
              return (
                <AppleIcon
                  key={user.id}
                  src={"/icons/folder.png"}
                  name={user.name}
                  url={user.id}
                />
              );
            })}
        </div>
      </AppleWindow>
      <Outlet />
    </>
  );
};

export default DiskUserList;
