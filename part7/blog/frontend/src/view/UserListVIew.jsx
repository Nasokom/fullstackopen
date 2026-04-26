import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import blogService from "../services/blogs";
import AppleList from "../components/AppleList";
import { Link } from "react-router";
import { Outlet } from "react-router";
const Userlist = () => {
  const users = useSelector(({ users }) => users);
  console.log(users);
  return (
    <>
      <AppleList data={{ list: users, type: "users" }} />
      <Outlet />
    </>
    // <div>
    //   <h1>Users</h1>
    //   {users && (
    //     <table>
    //       <tbody>
    //         <tr>
    //           <td></td>
    //           <td>blogs created</td>
    //         </tr>
    //         {users.map((user) => {
    //           return (
    //             <tr key={user.id}>
    //               <td>
    //                 <Link to={"/users/" + user.id}>{user.name}</Link>
    //               </td>
    //               <td>{user.blogs ? user.blogs.length : 0}</td>
    //             </tr>
    //           );
    //         })}
    //         <tr></tr>
    //       </tbody>
    //     </table>
    //   )}
    // </div>
  );
};

export default Userlist;
