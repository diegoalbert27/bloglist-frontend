import React, {useState} from "react"

const BlogForm = ({  addNewBlog }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    addNewBlog(blog)
    
    setBlog({    
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
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
            onChange={({ target }) =>
              setBlog({ ...blog, author: target.value })
            }
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
  )
}

export default BlogForm
