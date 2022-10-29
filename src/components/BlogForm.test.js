import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const newBlog = {
  title: 'Solid.js a new reactive framework',
  author: 'Nickname',
  url: 'https://www.solidjs.com/'
}

test('<BlogForm /> create a new blog', () => {
  const addNewBlog = jest.fn()

  const component = render(<BlogForm addNewBlog={addNewBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: newBlog.title }
  })

  fireEvent.change(author, {
    target: { value: newBlog.author }
  })

  fireEvent.change(url, {
    target: { value: newBlog.url }
  })

  fireEvent.submit(form)

  expect(addNewBlog.mock.calls).toHaveLength(1)

  expect(addNewBlog.mock.calls[0][0].title).toBe(newBlog.title)
  expect(addNewBlog.mock.calls[0][0].author).toBe(newBlog.author)
  expect(addNewBlog.mock.calls[0][0].url).toBe(newBlog.url)
})
