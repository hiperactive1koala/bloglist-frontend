import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";

import LandingPage from "./pages/LandingPage";
import Users from "./components/Users";
import User from "./components/User";
import Header from "./components/Header";
import Blog from "./components/Blog";

import ThemeProvider from 'react-bootstrap/ThemeProvider'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, []);

  return (
    <ThemeProvider>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="users/:id" element={<User />}></Route>
        <Route path="users" element={<Users />}></Route>
        <Route path="blogs/:id" element={<Blog />}></Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
