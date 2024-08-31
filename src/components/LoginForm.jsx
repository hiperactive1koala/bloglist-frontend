import React, { useState } from "react";

import { Login } from "../reducers/userReducer";
import { SetNotificationError } from "../reducers/notificationReducer";
import loginService from "../services/login";

import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const userObj = { username, password };
    try {
      const user = await loginService.login(userObj);
      dispatch(Login(user));
    } catch (error) {
      dispatch(SetNotificationError(error.response.data.error));
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h1>Log into Application</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
