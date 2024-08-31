import { useState } from "react";
import Blog from "./Blog";

import { useSelector, useDispatch } from "react-redux";
import { SetBlogs } from "../reducers/blogReducer";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const [id, setid] = useState("");

  const sortByLikes = () => {
    const newBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);
    dispatch(SetBlogs(newBlogs));
  };

  if (blogs === null) return null;
  return (
    <>
      <button onClick={sortByLikes}>sort by likes</button>
      <ul data-testid="blog-list">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} id={id} setId={setid} user={user} />
        ))}
      </ul>
    </>
  );
};

export default BlogList;
