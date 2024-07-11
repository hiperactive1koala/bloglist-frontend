import React, { useState } from 'react'

const BlogForm = ({ create }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = (event) => {
        event.preventDefault()

        create({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }
  return (
    <div>
        <form onSubmit={handleCreate}>
          <label>title 
            <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
          </label><br />
          <label>author 
            <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
          </label><br />
          <label>url 
            <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
          </label><br />
          <button type="submit">create</button>
        </form>
    </div>
  )
}

export default BlogForm