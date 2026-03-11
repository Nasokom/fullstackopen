// @ts-check
import { test, expect } from '@playwright/test';
import helper from './helper'


test.describe('Blog app',()=>{

  test.beforeEach( async({page,request})=>{

    await request.post('http://localhost:3003/api/testing/reset')

    await request.post('http:/localhost:3003/api/users',{
      data:helper.user
    })

     await request.post('http:/localhost:3003/api/users',{
      data:helper.user2
    })

    await page.goto('http://localhost:5173/');
  })

  test('Login form is shown',async ({page})=>{
    const textElt = await page.getByText('login to application')
    const usernameElt = await page.getByLabel('username')
    const passwordElt = await page.getByLabel('password')
    const submitElt = await page.getByRole('button')
    
    await expect(textElt).toBeVisible()
    await expect(usernameElt).toBeEditable()
    await expect(passwordElt).toBeEditable()
    await expect(submitElt).toBeInViewport()

  })

  test.describe('Login',()=>{

    test('fails with wrong credentials',async ({page})=>{
      await helper.login(page,{username:'mike',password:'wrong'})
       const errElt = await page.getByText('error: wrong login or password')
      
      await expect(errElt).toBeVisible()
      await expect(errElt).toHaveCSS('color','rgb(255, 0, 0)')
    })

    test('succeeds with correct credentials',async ({page})=>{

      await  helper.login(page,helper.user)

      const titleElt = await page.getByText('blogs')

      const sucessElt = await page.locator('.notification')
      await expect(titleElt).toBeVisible()
      await expect(sucessElt).toHaveCSS('color','rgb(0, 128, 0)')
      await expect(sucessElt).toContainText(`Welcome ${helper.user.name}`)

    })

  })

  test.describe('when login',()=>{

    test.beforeEach(async({page})=>{
      helper.login(page,helper.user)
    })

     test('a new blog can be created', async ({ page }) => {
        
      helper.createBlog(page)

       const sucessElt = await page.locator('.notification')
       await expect(sucessElt).toHaveCSS('color','rgb(0, 128, 0)')
       await expect(sucessElt).toContainText('a new blog')
       const blogList = page.locator('.blog').filter({hasText:`${helper.blog.title} ${helper.blog.author}`})
       await expect(blogList).toBeVisible()
    })
  })

  test.describe('when login and existing blog',()=>{

    test.beforeEach(async({page,request})=>{
            await helper.login(page,helper.user)
            await helper.createBlog(page)
            await helper.logout(page)
    })
    
    test('a blog can be liked', async({page})=>{
      await helper.login(page,helper.user2)
       await page.getByText('view').click()
      const beforeClick = await page.getByTestId('likesCount').innerHTML()
       console.log(beforeClick)
       await page.getByRole('button',{name:'like'}).click()
       const notif = await page.locator('.notification')
       await expect(notif).toBeVisible()
       await expect(notif).toContainText('just gain 1 like')
       const afterClick = await page.getByTestId('likesCount').innerHTML()
       expect(Number(afterClick)).toBe(Number(beforeClick)+1)
    })

    test('a user can delete his own post',async({page})=>{
      await helper.login(page,helper.user)
      await helper.deleteBlog(page)
      const notif = await page.locator('.notification')
        await expect(notif).toBeVisible()
        await expect(notif).toHaveText('blog delete with success')
    })
    test("a post can be delete only by his owner", async({page})=>{

        await helper.login(page,helper.user2)
        await page.getByText('view').click()
        await expect(page.getByText('remove')).toBeHidden()
    })
  })


  test.describe('Many blogs display',()=>{

      test.beforeEach(async({request,page})=>{
        await request.post('http://localhost:3003/api/testing/post')
          await page.goto('http://localhost:5173/');
         await helper.login(page,helper.user)
      })
      
      test('blogs should be ordered by likes DESC',async ({page})=>{
        
          await page.locator('.blog')
          await expect(page.getByText('Blogs')).toBeVisible()

          const likes = []

        for (const blog of await page.locator('.blog').all()){
          await blog.getByText('view').click()
          await likes.push(Number( await blog.getByTestId('likesCount').innerHTML()))

        }

        for(let i = 0 ; i > likes.length ; i++){
          await expect(likes[i]).toBeGreaterThanOrEqual(likes[i+1])
        }

        await expect(likes).toEqual(likes.toSorted((a,b)=>b-a))

      })
  })
})

