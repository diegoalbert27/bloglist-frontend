import { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import Notification from './Notification'
import BlogForm from './BlogForm'

import blogService from '../services/blogs'
import Togglable from './Togglable'

import PropTypes from 'prop-types'

const Blogs = ({ user, handleUser }) => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    handleUser(null)
  }

  const addNewBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()

      const newBlog = await blogService.create(blog)

      setBlogs(blogs => [...blogs, newBlog])

      setType('success')
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author}`)

      setTimeout(() => {
        setType('')
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setType('error')
      setMessage(exception.message)
      setTimeout(() => {
        setType('')
        setMessage(null)
      }, 5000)
    }
  }

  const addNewLikePerBlog = async (blog) => {
    try {
      const updateBlog = {
        ...blog,
        likes: blog.likes + 1
      }

      await blogService.update(blog.id, updateBlog)

      const index = blogs.findIndex(blog => blog.id === updateBlog.id)
      blogs[index].likes = updateBlog.likes

      setBlogs(blogs.sort((a, b) => b.likes - a.likes))

      setType('success')
      setMessage(`a new like for ${updateBlog.title}`)

      setTimeout(() => {
        setType('')
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
    }
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)

      const newBlogs = blogs.filter(currentBlog => currentBlog.id !== blog.id)
      setBlogs(newBlogs)

      setType('success')
      setMessage(`${blog.title} by ${blog.author} removed`)

      setTimeout(() => {
        setType('')
        setMessage(null)
      }, 5000)
    } catch (exception) {
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

      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm addNewBlog={addNewBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => <Blog key={blog.id} blog={blog} addNewLike={addNewLikePerBlog} removeBlog={removeBlog} />)}

    </div>
  )
}

Blogs.propsTypes = {
  user: PropTypes.string.isRequired,
  handleUser: PropTypes.func.isRequired
}

export default Blogs
