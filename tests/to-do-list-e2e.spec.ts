import { test, expect } from '@playwright/test';
import axios from 'axios';

const baseUrl = 'http://localhost:3000'

test.beforeEach(async ({page}) => {
  await page.goto(baseUrl);
})

test.describe("check basic functionality", () => {
  test.afterEach(async ()=>{
    await axios.delete(`${baseUrl}/api/toDoList`).catch((error)=>{
      console.log(error)
    })
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Simple To Do List by Alex/);
  });
  
  test('will show error message when user have not input text in field',async ({ page }) => {
    await expect(page.getByTestId('add-item-warning')).not.toBeVisible();
  
    await page.getByTestId('add-item-btn').click()
    await expect(page.getByTestId('add-item-warning')).toBeVisible();
  });
})

test.describe("check user flow", () => {
  test.afterAll(async ()=>{
    await axios.delete(`${baseUrl}/api/toDoList`).catch((error)=>{
      console.log(error)
    })
  })
  test('will add item when user have input the text and clicked the button',async ({ page }) => {
    await page.getByTestId('input-field').locator('input').fill("Test is a test from playwright")
    await page.getByTestId('add-item-btn').click()
  
    await page.getByTestId('todo-list-item').first().waitFor()
    await expect(await page.getByTestId('todo-list-item').count()).toBe(1)
    await expect(await page.getByTestId('action-btn-for-todo')).toBeVisible();
    await expect(await page.getByTestId('action-btn-for-finished')).not.toBeVisible();
  });
  
  test('should change into finished item when clicked the mark as done button',async ({ page }) => {
    await page.getByTestId('todo-list-item').first().getByTestId('mark-as-done-btn').click()
    await page.getByTestId('todo-list-item').first().waitFor()
    await expect(await page.getByTestId('action-btn-for-finished')).toBeVisible();
    await expect(await page.getByTestId('action-btn-for-todo')).not.toBeVisible();
  });

  test('should change into to-do item when clicked the revert to to-do button',async ({ page }) => {
    await page.getByTestId('todo-list-item').first().getByTestId('revert-to-todo-btn').click()
    await page.getByTestId('todo-list-item').first().waitFor()
    await expect(await page.getByTestId('action-btn-for-todo')).toBeVisible();
    await expect(await page.getByTestId('action-btn-for-finished')).not.toBeVisible();
  });

  test('should delete the item when clicked the delete button',async ({ page }) => {
    await page.getByTestId('todo-list-item').first().getByTestId('delete-btn').click()
    await page.waitForTimeout(0)

    await expect(await page.getByTestId('todo-list-item').count()).toBe(0)
  });
})



