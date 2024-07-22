import PropTypes from 'prop-types'

const Blog = ({ blog, id, setId, like, remove, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let isOpen = id === blog.id ? true : false
  

  const handleView = (event) => {
    event.preventDefault()
    isOpen ? setId('-1') : setId(blog.id)
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
    <li style={blogStyle}>
      <div className='blog-info'>
        <span>
          {`${blog.title} ${blog.author} `}
        </span>
        <span>
          <button onClick={handleView} className='show-full'>{isOpen ? 'hide': 'view'}</button>
        </span>
      </div>
      {isOpen &&
        <div>
          <a href={blog.url} className='blog-url'>{blog.url}</a>
          <div>
            <span className='blog-likes'>likes: {blog.likes}</span>
            <button onClick={handleLike} id='like-button'>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username &&
            <button onClick={handleRemove}>remove</button>
          }
        </div>
      }
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // like: PropTypes.func.isRequired,
  // setId: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
  // remove: PropTypes.func.isRequired,
}

export default Blog