import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog } from "../reducer/blogReducer";
import Togglable from "../components/Togglable";
import CreateBlog from "../components/CreateBlog";
import Blog from "../components/Blog";
import AppleList from "../components/AppleList";
import { Outlet } from "react-router";
import AppleWindow from "../components/AppleWindow";

const BlogListView = ({ user }) => {
  const blogs = useSelector(({ blog }) => blog);
  const createFormRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const close = () => setToggle(false);
  return (
    <>
      <AppleList data={{ list: blogs, type: "blogs" }}>
        <p>Blogs Disk</p>
        {/* <Togglable buttonLabel={"create"} ref={createFormRef}></Togglable> */}
        <button onClick={() => setToggle(!toggle)}>create</button>
      </AppleList>

      <Outlet />
      {toggle && (
        <AppleWindow onClose={close}>
          <CreateBlog token={user.token} toggle={close} />
        </AppleWindow>
      )}
    </>
  );
};

export default BlogListView;
