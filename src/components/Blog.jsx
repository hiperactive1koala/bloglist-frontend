
import { useDispatch, useSelector } from "react-redux";
import { CommentBlog, LikeBlog } from "../reducers/blogReducer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Container, Form, ListGroup } from "react-bootstrap";

const Blog = () => {
  const [comment, setComment] = useState("");
  const blogID = useParams().id;

  const blog = useSelector(
    (state) => state.blogs.filter((blog) => blog.id === blogID)[0],
  );

  const dispatch = useDispatch();

  const handleLike = (event) => {
    event.preventDefault();
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(LikeBlog(updatedBlog));
  };

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(CommentBlog({ ...blog, comment }));
    setComment("");
  };

  if (!blog) return null;

  return (
    <Container className="mt-4">
      <h3 className="h3">
        {blog.title} {blog.author}
      </h3>
      <a variant="info mb-3" href={`http://${blog.url}`} rel='noopener noreferrer' target="_blank">
        {blog.url}
      </a>
      <p className="h5 mb-0">
        <span className=" align-middle">{blog.likes} likes</span> <Button variant="secondary" onClick={handleLike}>like</Button>
      </p>
      <p className="text-muted">added by {blog.user.name}</p>
      <h3 className="h3">comments</h3>
      <Form onSubmit={addBlog} className="mb-3">
        <Form.Control
        className="mb-3"
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="success" type="submit">add comment</Button>
      </Form>
      {blog.comments && (
        <ListGroup as={'ul'}>
          {blog.comments.map((comment) => (
            <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Blog;
