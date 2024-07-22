import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = event => {
    event.preventDefault()

    login({
      username: username,
      password: password
    })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1>Log into Application</h1>
      <form onSubmit={handleLogin} >
        <div>
                    Username
          <input
            data-testid='username'
            type="text"
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    Password
          <input
            data-testid='password'
            type="password"
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

LoginForm.prototypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm