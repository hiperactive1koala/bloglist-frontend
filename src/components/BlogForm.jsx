import React, { useState } from "react";

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
    <div>
      <form onSubmit={handleCreate}>
        <label>
          title
          <input
            data-testid="title"
            type="text"
            value={title}
            placeholder="Title of Blog"
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <br />
        <label>
          author
          <input
            data-testid="author"
            type="text"
            value={author}
            placeholder="Author of Blog"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <br />
        <label>
          url
          <input
            type="text"
            data-testid="url"
            value={url}
            placeholder="Url of Blog"
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <br />
        <button type="submit" id="create-blog">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
