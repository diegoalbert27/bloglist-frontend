import { useState } from 'react'
import Blog from './Blog'
import Notification from './Notification'

import blogService from '../services/blogs'

const Blogs = ({ blogs, user, handleUser, handleBlogs }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const [message, setMessage] = useState(null)
  const [type, setType] = useState('')

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    handleUser(null)
  }

  const handleForm = async (e) => {
    e.preventDefault()
    try {
      const newBlog = await blogService.create(blog)
      
      setBlog({    
        title: '',
        author: '',
        url: ''
      })

      handleBlogs(blogs => [...blogs, newBlog])

      setType('success')
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setType('')
        setMessage(null)
      }, 5000)
    } catch(exception) {
      setType('error')
      setMessage(exception.message)
      setTimeout(() => {
        setType('')
        setMessage(null)
      }, 5000)
    }
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <Notification type={type} message={message} />
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      </div>
      <div>
        <h2>create new</h2>
        <form onSubmit={handleForm}>
          <div>
            title:
            <input 
              type="text"
              value={blog.title}
              name="title"
              onChange={({ target }) => setBlog({ ...blog, title: target.value })}
            />
          </div>
          <div>
            author:
            <input 
              type="text"
              value={blog.author}
              name="author"
              onChange={({ target }) => setBlog({ ...blog, author: target.value })}
            />
          </div>
          <div>
            url:
            <input 
              type="text"
              value={blog.url}
              name="url"
              onChange={({ target }) => setBlog({ ...blog, url: target.value })}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs
