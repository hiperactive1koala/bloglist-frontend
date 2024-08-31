import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { DeleteBlog, likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog, id, setId, user }) => {
  const dispatch = useDispatch();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  let isOpen = id === blog.id ? true : false;

  const handleView = (event) => {
    event.preventDefault();
    isOpen ? setId("-1") : setId(blog.id);
  };

  const handleLike = (event) => {
    event.preventDefault();
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(updatedBlog));
  };

  const handleRemove = (event) => {
    event.preventDefault();

    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(DeleteBlog(blog.id));
    }
  };

  return (
    <li style={blogStyle}>
      <div className="blog-info">
        <span>{`${blog.title} ${blog.author} `}</span>
        <span>
          <button onClick={handleView} className="show-full">
            {isOpen ? "hide" : "view"}
          </button>
        </span>
      </div>
      {isOpen && (
        <div>
          <a href={blog.url} className="blog-url">
            {blog.url}
          </a>
          <div>
            <span className="blog-likes">likes: {blog.likes}</span>
            <button onClick={handleLike} id="like-button">
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      )}
    </li>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // setId: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
  // remove: PropTypes.func.isRequired,
};

export default Blog;
