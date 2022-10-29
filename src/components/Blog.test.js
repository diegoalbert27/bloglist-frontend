import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const blog = {
  author: 'Diego Hinagas',
  title: 'El cielo mas grande de todos',
  likes: 3,
  url: 'https://diegobebtio.com'
}

test('show only title and author for blog per default without likes or url', () => {
  const { container } = render(
    <Blog blog={blog} addNewLike={() => {}} removeBlog={() => {}} />
  )

  const blogTitle = container.querySelector('.blog-title')

  expect(blogTitle).toBeDefined()
  expect(blogTitle).toBeVisible()
  expect(blogTitle).toHaveTextContent(`${blog.title} by ${blog.author}`)

  const blogDetails = container.querySelector('.blog-details')
  expect(blogDetails).toBeDefined()
  expect(blogDetails).not.toBeVisible()
})
