import { useState } from 'react'

import PropTypes from 'prop-types'

const Blog = ({ blog, addNewLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    addNewLike(blog)
  }

  const handleRemove = () => {
    const isConfirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (isConfirm) {
      removeBlog(blog)
    }
  }

  return (
    <div>
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>view</button>
      </div>
      <div style={{ ...blogStyle, display: visible ? '' : 'none' }}>
        {blog.url}
        <br />
        Likes {blog.likes} <button onClick={handleLike}>like</button>
        <br />
        {blog.author}
        <br />
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addNewLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
