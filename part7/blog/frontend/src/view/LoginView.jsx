import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../reducer/userReducer";

import AppleWindow from "../components/AppleWindow";

const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(authUser({ username, password }));
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        backgroundColor: "lightgrey",
      }}
    >
      <AppleWindow title={"login"}>
        <form onSubmit={handleLogin}>
          <label>
            username
            <input
              value={username}
              name="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            password
            <input
              value={password}
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">start</button>
        </form>
      </AppleWindow>
    </div>
  );
};

export default LoginView;
