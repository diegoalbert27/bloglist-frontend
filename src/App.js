import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {
        user === null ? <Login handleUser={setUser} /> : <Blogs user={user} handleUser={setUser} />
      }
    </div>
  )
}

export default App
