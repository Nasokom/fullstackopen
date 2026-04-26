import { useEffect, useRef } from "react";
import blogService from "./services/blogs";

import { useDispatch, useSelector } from "react-redux";
import { initBlogList } from "./reducer/blogReducer";
import { authUser } from "./reducer/userReducer";
import { initUserList } from "./reducer/userListReducer";
import { Routes, Route, Navigate, useNavigate } from "react-router";

import Header from "./components/Header";

import UserListView from "./view/UserListVIew";
import HomeView from "./view/HomeView";
import BlogListView from "./view/BlogListView";
import UserView from "./view/User";
import LoginView from "./view/LoginView";
import BlogView from "./view/BlogView";
import DiskView from "./view/DiskView";
import DiskUserList from "./view/DiskUserList";
import DiskList from "./view/DiskList";
import { externRouter } from "./utils/helper";
import Notification from "./components/Notification";
import Layout from "./components/Layout";
const App = () => {
  const user = useSelector(({ user }) => user) || null;
  const dispatch = useDispatch();

  externRouter.navigate = useNavigate();

  useEffect(() => {
    dispatch(initBlogList());
    dispatch(initUserList());

    const token = blogService.getUser();
    if (token) {
      dispatch(authUser(token));
    }
  }, [dispatch]);

  return (
    <>
      <div id="app">
        <Notification />
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate replace to="/" /> : <LoginView />}
          />
          <Route element={user ? <Layout /> : <LoginView />}>
            <Route path="/" element={<></>} />
            <Route path="/blogs" element={<BlogListView user={user} />}>
              <Route path="/blogs/:id" element={<BlogView />} />
            </Route>
            <Route path="users" element={<UserListView />}>
              <Route path="/users/:id" element={<UserView />} />
            </Route>

            <Route path="disk" element={<DiskView />}>
              <Route path="users" element={<DiskList type={"users"} />}>
                <Route
                  path=":id"
                  element={<UserView close={"/disk/users"} />}
                />
              </Route>
              <Route path="blogs" element={<DiskList type={"blog"} />}>
                <Route
                  path=":id"
                  element={<BlogView close={"/disk/blogs"} />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
