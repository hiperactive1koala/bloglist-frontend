const Blog = ({ blog, id, setId, like, remove, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const isOpen = id === blog.id ? true : false

  const handleView = (event) => {
    event.preventDefault()
    isOpen ? setId(-1) : setId(blog.id)
  }

  const handleLike = (event) => {
    event.preventDefault()
    const updatedBlog = { 
      ...blog,
      likes: blog.likes + 1
      }
    like(updatedBlog)
  }

  const handleRemove = (event) => {
    event.preventDefault()

    if(window.confirm(`Remove ${blog.title} by ${blog.author}?`)){
      remove(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={handleView}>{isOpen ? 'hide': 'view'}</button>
      {isOpen && 
        <div>
          <a href={blog.url} >{blog.url}</a>
          <div>likes: {blog.likes} <button onClick={handleLike}>like</button></div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username &&
            <button onClick={handleRemove}>remove</button>
          }
        </div>
      }
    </div>
  )
}

export default Blog