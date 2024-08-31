import { useEffect, useRef } from "react";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";

import { useDispatch, useSelector } from "react-redux";

import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, Logout } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const blogRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, []);

  const handleLogout = async () => {
    dispatch(Logout());
  };

  // if (user === null) {
  //   return (
  //     <>
  //       <Notification />
  //       <Togglable buttonLabel="login">
  //         <LoginForm/>
  //       </Togglable>
  //     </>
  //   );
  // }

  return (
    <div>
      <Notification />
      {!user && (
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new note" ref={blogRef}>
            <BlogForm />
          </Togglable>
          <BlogList />
        </>
      )}
    </div>
  );
};

export default App;
