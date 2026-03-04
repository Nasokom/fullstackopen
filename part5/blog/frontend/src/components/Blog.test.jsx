import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const dummy = {
  author:'testAuthor',
  url:'testurl',
  likes:42,
  title:'testTitle'

}


describe('Testing <Blog/> default render', () => {



  test('Expect to render blog title and author ',async () => {

    render(<Blog blog={dummy} />)

    const element = await screen.findByText(dummy.title +' '+ dummy.author,{ exact:false })
    expect(element).toBeDefined()
  })


  test('Expect blog to not render Likes and URL by default',async () => {

    const { container } = render(<Blog blog={dummy} />)

    const element = await container.querySelector('.blog')

    expect(element).not.toHaveTextContent(dummy.likes)
    expect(element).not.toHaveTextContent(dummy.url)
  })

})

describe('Testing <Blog/> user interaction',() => {




  test('Expect url and likes visible onToggle',async () => {
    const { container,getByRole } = render(<Blog blog={dummy} />)

    const blogComponent = await  container.querySelector('.blog')

    const user = userEvent.setup()
    const button = getByRole('button')
    await user.click(button)
    expect(blogComponent).toHaveTextContent(dummy.likes)
    expect(blogComponent).toHaveTextContent(dummy.url)

  })

  test('Expect evt handler called count === button click',async() => {

    const updatePost = vi.fn()
    const user = userEvent.setup()

    const { getByRole,getByText } = render(<Blog blog={dummy} updatePost={updatePost}/>)
    const collapseBtn = getByRole('button')

    await user.click(collapseBtn)
    const likeBtn = await getByText('like')
    screen.debug(likeBtn)
    await user.dblClick(likeBtn)
    expect(await updatePost.mock.calls).toHaveLength(2)

  })

})