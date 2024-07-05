import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [error, setError] = useState(true)
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
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

  const handleCreate = async (event) => {
    event.preventDefault()

    const blogObj = {
      title: title,
      author: author,
      url: url
    }

    const savedblog = await blogService.create(blogObj)
    setBlogs(blogs.concat(savedblog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setNotificationMessage(`a new blog ${blogObj.title} by ${blogObj.author} added`)
    setError(false)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000);
  }

  if (user === null) {
    return (
      <>
        <Notification
          message={notificationMessage}
          className={error ? 'error' : 'success'} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword} />
      </>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification
          message={notificationMessage}
          className={error ? 'error' : 'success'} />
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <form onSubmit={handleCreate}>
          <label>title <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} /></label><br />
          <label>author <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} /></label><br />
          <label>url <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} /></label><br />
          <button type="submit">create</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App