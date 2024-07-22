import { render } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('component displaying a blog renders the blog\'s title and author', () => {
    const blog = {
        id: 'n',
        title: 'There is blog or there is no blog. Thats the matter...',
        author: 'Koala'
    }
  const { container } = render(<Blog blog={blog} />)

  const content = container.querySelector('.blog-info')

  expect(content).toHaveTextContent('There is blog or there is no blog. Thats the matter...')
  expect(content).toHaveTextContent('Koala')
})

test("blog's URL and number of likes are shown when the button controlling the shown details has been clicked" , async () => {
    const blog = {
        id: '667b471962c6b94e900509cb',
        title: "Hello World",
        author: "Alien",
        url: "outher planets doesn't have url",
        likes: 66,
        user: {
            username: "ko",
            name: 'lo',
            id: '667b470d62c6b94e900509c9'
        }
    }

    let id = -1
    const setId =(_id) => id= _id;
    
    let { container } = render(<Blog blog={blog} user={blog.user} id={id} setId={setId} />)

    const user = userEvent.setup()
    const button = container.querySelector('.show-full')
    expect(button).toBeDefined()
    await user.click(button)

    container = render(<Blog blog={blog} user={blog.user} id={id} setId={setId} />).container

    const url = container.querySelector('.blog-url')
    const likes = container.querySelector('.blog-likes')
    
    expect(url).toBeDefined()
    expect(likes).toBeDefined()

    expect(url).toHaveTextContent(blog.url, { exact: false })
    expect(likes).toHaveTextContent(blog.likes, { exact: false })
})

test("the like button is clicked twice, the event handler the component received as props is called twice" , async () => {
    const blog = {
        id: '667b471962c6b94e900509cb',
        title: "Hello World",
        author: "Alien",
        url: "outher planets doesn't have url",
        likes: 66,
        user: {
            username: "ko",
            name: 'lo',
            id: '667b470d62c6b94e900509c9'
        }
    }

    const mockHandler = vi.fn()
    let { container } = render(<Blog blog={blog} user={blog.user} id={blog.id} like={mockHandler} />)

    const user = userEvent.setup()
    const button = container.querySelector('#like-button')
    expect(button).toBeDefined()
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
