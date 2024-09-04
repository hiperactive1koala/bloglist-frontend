import React, { useState } from "react";

import { Login } from "../reducers/userReducer";
import { SetNotificationError } from "../reducers/notificationReducer";
import loginService from "../services/login";

import { useDispatch } from "react-redux";
import { Form, InputGroup } from "react-bootstrap";

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
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-0" controlId="login">
          <InputGroup className="mb-3">
          <InputGroup.Text id="username">Username</InputGroup.Text>
            <Form.Control
              data-testid="username"
              type="text"
              value={username}
              placeholder="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
          <InputGroup.Text id="password">Password</InputGroup.Text>
            <Form.Control
              data-testid="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </InputGroup>
        </Form.Group>
        <button type="submit">Login</button>
      </Form>
    </div>
  );
};

export default LoginForm;
