import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  author: 'Diego Hinagas',
  title: 'El cielo mas grande de todos',
  likes: 3,
  url: 'https://diegobebtio.com'
}

test('show only title and author for blog per default without likes or url', () => {
  const component = render(
    <Blog blog={blog} addNewLike={() => {}} removeBlog={() => {}} />
  )

  const blogTitle = component.container.querySelector('.blog-title')

  expect(blogTitle).toBeDefined()
  expect(blogTitle).toBeVisible()
  expect(blogTitle).toHaveTextContent(`${blog.title} by ${blog.author}`)

  const blogDetails = component.container.querySelector('.blog-details')
  expect(blogDetails).toBeDefined()
  expect(blogDetails).not.toBeVisible()
})

test('see likes and url when click on view', () => {
  const component = render(<Blog blog={blog} addNewLike={() => {}} removeBlog={() => {}} />)

  const button = component.getByText('view')
  fireEvent.click(button)

  const blogDetails = component.container.querySelector('.blog-details')
  expect(blogDetails).toBeVisible()
  expect(blogDetails).toHaveTextContent(`${blog.url}`)
  expect(blogDetails).toHaveTextContent(`${blog.likes}`)
})

test('click the like button twice and fire your controller twice', () => {
  const mockHandler = jest.fn()
  
  const component = render(<Blog blog={blog} addNewLike={mockHandler} removeBlog={() => {}} />)

  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)

  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)
  
  expect(mockHandler.mock.calls).toHaveLength(2)
})
