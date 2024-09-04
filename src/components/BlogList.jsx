import { useSelector, useDispatch } from "react-redux";
import { SetBlogs } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

import { Button, ListGroup } from 'react-bootstrap'

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const sortByLikes = () => {
    const newBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);
    dispatch(SetBlogs(newBlogs));
  };

  if (blogs === null) return null;
  return (
    <>
      <Button variant="secondary" onClick={sortByLikes}>sort by likes</Button>
      <ListGroup as='ul' data-testid="blog-list">
        {blogs.map((blog) => (
          <ListGroup.Item
           as={Link} 
           variant="link" 
           key={blog.id} 
           style={blogStyle} 
           action to={`/blogs/${blog.id}`}
           >
            {/* <Link to={`/blogs/${blog.id}`}> */}
              {blog.title} <strong>{blog.author}</strong>
            {/* </Link> */}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default BlogList;
