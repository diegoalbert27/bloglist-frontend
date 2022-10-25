import { useState } from 'react'
import loginService from '../services/login'
import Notification from './Notification'
import blogService from '../services/blogs'

import PropTypes from 'prop-types'

const Login = ({ handleUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const credentials = {
        username,
        password
      }
      const response = await loginService.login(credentials)

      setUsername('')
      setPassword('')

      handleUser(response)

      blogService.setToken(response.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(response))
    } catch (exception) {
      setType('error')
      setMessage('Wrong username or password')
      setTimeout(() => {
        setType('')
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification type={type} message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text' value={username} name='username' onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type='password' value={password} name='password' onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  handleUser: PropTypes.func.isRequired
}

export default Login
