import { useState } from 'react'
import Blog from './Blog'
import Notification from './Notification'
import BlogForm from './BlogForm'

import blogService from '../services/blogs'
import Togglable from './Togglable'

const Blogs = ({ blogs, user, handleUser, handleBlogs }) => {
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('')
  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    handleUser(null)
  }

  const handleVisible = () => setVisible(!visible)

  const addNewBlog = async (blog) => {
    try {
      setVisible(false);
      
      const newBlog = await blogService.create(blog)

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
      
      <Togglable buttonLabel="new note" visible={visible} handleVisible={handleVisible}>
        <BlogForm addNewBlog={addNewBlog} />
      </Togglable>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    
    </div>
  )
}

export default Blogs
