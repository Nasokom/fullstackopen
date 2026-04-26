import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog } from "../reducer/blogReducer";
import Togglable from "../components/Togglable";
import CreateBlog from "../components/CreateBlog";
import Blog from "../components/Blog";
import AppleList from "../components/AppleList";
import Layout from "../components/Layout";

const HomeView = ({ user, children }) => {
  const blogs = useSelector(({ blog }) => blog);
  const dispatch = useDispatch();

  return <Layout>{children}</Layout>;
};

export default HomeView;
