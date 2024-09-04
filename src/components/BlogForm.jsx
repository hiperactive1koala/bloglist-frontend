import React, { useState } from "react";
import { Form, Button, InputGroup } from 'react-bootstrap'

import { useDispatch } from "react-redux";
import { CreateBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = (event) => {
    event.preventDefault();

    const blog = { title, author, url };
    dispatch(CreateBlog(blog));

    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <Form onSubmit={handleCreate}>
      <Form.Group className="mb-0" controlId="create-blog">
      <InputGroup className="mb-3">
        <InputGroup.Text id="title">title</InputGroup.Text>
          <Form.Control
            data-testid="title"
            type="text"
            value={title}
            placeholder="Title of Blog"
            onChange={({ target }) => setTitle(target.value)}
          />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="author">author</InputGroup.Text>
          <Form.Control
            data-testid="author"
            type="text"
            value={author}
            placeholder="Author of Blog"
            onChange={({ target }) => setAuthor(target.value)}
          />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="url">url</InputGroup.Text>
          <Form.Control
            data-testid="url"
            type="text"
            value={url}
            placeholder="Url of Blog"
            onChange={({ target }) => setUrl(target.value)}
          />
      </InputGroup>
      </Form.Group>
      <Button variant="success" className="mb-3" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default BlogForm;
