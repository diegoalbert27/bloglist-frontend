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

  const labelButton = visible ? 'hide' : 'view'

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
    <div style={blogStyle}>
      <div className='blog-title'>
        {blog.title} by {blog.author}
        <button onClick={() => setVisible(!visible)}>{labelButton}</button>
      </div>
      <div className='blog-details' style={{ display: visible ? '' : 'none' }}>
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
