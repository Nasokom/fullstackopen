// @ts-check
const { test, expect} = require('@playwright/test')
const { describe, beforeEach } = require('node:test')
const { createNote, loginWith } = require('./helper.mjs')



describe('Note app', () => {

   test.beforeEach(async ({ page,request }) => {
     await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {

    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })
  
  test('user can log in', async ({ page }) => {
      loginWith(page,'mluukkai','salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })

test('login fails with the wrong password',async({page})=>{
  loginWith(page,'mluukkai','wrong')
  const errorDiv = page.locator('.error')  
  await expect(errorDiv).toContainText('wrong credentials')
  await expect(errorDiv).toHaveCSS('border-style', 'solid')
  await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

})


test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
        loginWith(page,'mluukkai','salainen')
    })

    test('a new note can be created', async ({ page }) => {
      const content = 'a note created by playwright'
      createNote(page,content)
      await expect(page.getByText(content)).toBeVisible()
    })


  test.describe('and a note exists', () => {
    
      test.beforeEach(async ({ page }) => {
        const content = 'a note created by playwright'
        createNote(page,content)
      })
  
      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: 'make not important' }).click()
        await expect(page.getByText('make important')).toBeVisible()
      })    
      
})


    test.describe('and several notes exists', () => {    

      test.beforeEach(async ({ page}) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')    
        await createNote(page, 'third note')    
        
      })
      
      test('one of those can be made nonimportant', async ({ page }) => {
        await page.pause()
       const otherNoteText = page.getByText('second note')

        const otherNoteElement = otherNoteText.locator('..')
        await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })
})
})