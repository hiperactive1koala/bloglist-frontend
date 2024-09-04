import { useRef } from "react";

import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import LoginForm from "../components/LoginForm";
import Notification from "../components/Notification";
import Togglable from "../components/Togglable";

import { useSelector } from "react-redux";

import { Container } from "react-bootstrap";

const LandingPage = () => {
  const user = useSelector((state) => state.user);
  const blogRef = useRef();

  const loginScreen = (
      <LoginForm />
    // <Togglable buttonLabel="login">
    // </Togglable>
  );
  return (
    <Container>
      <Notification />
      {!user && loginScreen}
      {user && (
        <>
          <Togglable buttonLabel="new note" ref={blogRef}>
            <BlogForm />
          </Togglable>
          <BlogList />
        </>
      )}
    </Container>
  );
};

export default LandingPage;
