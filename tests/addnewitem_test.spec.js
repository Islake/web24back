import { chromium } from 'playwright';
import { expect, test } from '@playwright/test';

test('Add a new product', async ({ page }) => {
  // Open the profile page
  await page.goto('http://127.0.0.1:3000/profile.html');

  // Click on "Edit Account Details" button
  await page.click('.editAccountDetailsBtn');

  // Fill in product details
  await page.fill('#productName', 'New Product');
  await page.fill('#productDescription', 'This is a new product');
  await page.fill('#productPrice', '9.99');
  await page.selectOption('#productCategory', { label: 'Japanese' });
  await page.check('#vegan');
  await page.check('#gluten');

  // Attach an image file
  const input = await page.$('input[type=file]');
  await input.setInputFiles('path/to/your/image.jpg');

  // Click on "Save Product" button
  await page.click('text=Save Product');

  // Wait for the product to be added
  await page.waitForSelector('text=New Product');

  // Verify that the new product is added successfully
  expect(await page.textContent('text=New Product')).toBeTruthy();
});
