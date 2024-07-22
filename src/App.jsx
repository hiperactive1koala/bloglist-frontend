import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [error, setError] = useState(true)
  const [openBlog, setOpenBlog] = useState('')

  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const userString = window.localStorage.getItem('loggedBlogappUser')
    if (userString) {
      const user = JSON.parse(userString)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObj) => {

    try {
      const user = await loginService.login(userObj)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
    } catch (error) {
      setError(true)
      setNotificationMessage(error.response.data.error)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
      console.error(error);
    }
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleCreate = async (blogObj) => {
    const savedblog = await blogService.create(blogObj)

    blogRef.current.toggleVisibility()

    setBlogs(blogs.concat(savedblog))
    setNotificationMessage(`a new blog ${blogObj.title} by ${blogObj.author} added`)
    setError(false)

    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000);
  }

  const handleLike = async (blogObj) => {
    const changedBlog = await blogService.change(blogObj)
    const index = blogs.findIndex(blog => blog.id === blogObj.id);

    let newState = [...blogs];
    newState[index] = {...blogObj, likes: changedBlog.likes};

    setBlogs( newState )
  }
  
  const handleDelete = async (blogId) => {
    await blogService.deleteOne(blogId)

    const updatedBlog = blogs.filter( blog => blog.id !== blogId )
    setBlogs([...updatedBlog])
  }

  const sortByLikes = () => {
    const newBlogs = blogs.sort((a,b) => b.likes - a.likes)
    setBlogs([...newBlogs])
  }


  if (user === null) {
    return (
      <>
        <Notification
          message={notificationMessage}
          className={error ? 'error' : 'success'}
        />
        <Togglable buttonLabel='login' >
          <LoginForm login={handleLogin} />
        </Togglable>
      </>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification
          message={notificationMessage}
          className={error ? 'error' : 'success'} 
        />
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel='new note' ref={blogRef}>
          <BlogForm create={handleCreate} />
        </Togglable>
        <button onClick={sortByLikes}>sort by likes</button>
        <ul data-testid='blog-list'>
        {blogs.map((blog) => 
          <Blog
            key={blog.id}
            blog={blog} 
            user={user}
            id={openBlog}
            setId={setOpenBlog}
            like={handleLike}
            remove={handleDelete}
          /> 
        )}
        </ul>
      </div>
    )
  }
}

export default App