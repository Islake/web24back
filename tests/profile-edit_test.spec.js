import { chromium } from 'playwright';
import { expect, test } from '@playwright/test';

test('example', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  page = await context.newPage();

  // Navigate to your HTML page
  await page.goto('http://127.0.0.1:3000'); // Update the URL to match your frontend server

  // Click the "Edit Account Details" button
  await page.click('.editAccountDetailsBtn');

  // Fill in the input fields with new data
  await page.fill('input[name="username"]', 'newusername');
  await page.fill('input[name="first_name"]', 'New');
  await page.fill('input[name="last_name"]', 'User');
  await page.fill('input[name="email"]', 'newemail@example.com');
  await page.fill('input[name="address"]', 'New Address');
  await page.fill('input[name="phone"]', '1234567890');

  // Click the "Save Account Details" button
  await page.click('.editAccountDetailsBtn');

  // Wait for the notification to appear
  await page.waitForSelector('.notification.show');

  // Capture a screenshot for verification
  await page.screenshot({ path: 'profile_updated.png' });

  // Close the browser
  await browser.close();
});
