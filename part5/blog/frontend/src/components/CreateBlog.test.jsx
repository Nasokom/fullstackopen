import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

describe('<CreateBlog/>', () => {


  test('form can send ', async () => {

    const user = userEvent.setup()
    const handleCreate = vi.fn()

    const field = ['title','author','url']

    render(<CreateBlog handleCreate={handleCreate}/>)

    const inputs = await screen.getAllByRole('textbox')

    for( let i = 0 ; i < inputs.length  ; i++){
      await user.type(inputs[i],field[i])
    }

    const button = screen.getByRole('button')

    await user.click(button)

    for( let i = 0 ; i < inputs.length  ; i++){
      expect(handleCreate.mock.calls[0][0][field[i]]).toBe(field[i])
    }
  })
})