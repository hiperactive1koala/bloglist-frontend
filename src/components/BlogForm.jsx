import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
          <input 
            data-testid='title'
            type="text" 
            value={title} 
            placeholder='Title of Blog'
            onChange={({ target }) => setTitle(target.value)} />
        </label><br />
        <label>author
          <input
           data-testid='author'
           type="text" 
           value={author} 
           placeholder='Author of Blog'
           onChange={({ target }) => setAuthor(target.value)} />
        </label><br />
        <label>url
          <input
           type="text" 
           data-testid='url'
           value={url} 
           placeholder='Url of Blog'
           onChange={({ target }) => setUrl(target.value)} />
        </label><br />
        <button
          type="submit"
          id='create-blog'
         >create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  create: PropTypes.func.isRequired
}

export default BlogForm