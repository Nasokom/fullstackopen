import React from "react";
import { Outlet } from "react-router";
import AppleWindow from "../components/AppleWindow";
import { useSelector } from "react-redux";
import AppleIcon from "../components/AppleIcon";

const DiskList = ({ type }) => {
  const datas = useSelector((state) => state[type]);
  const title = type + " folder";
  return (
    <>
      <AppleWindow title={title} onClose={"/Disk"}>
        <div className="disk-list">
          {datas &&
            datas.map((data) => {
              return (
                <AppleIcon
                  key={data.id}
                  src={"/icons/file.png"}
                  name={data.name || data.title}
                  url={data.id}
                />
              );
            })}
        </div>
      </AppleWindow>
      <Outlet />
    </>
  );
};

export default DiskList;
