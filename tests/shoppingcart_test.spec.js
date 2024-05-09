import { chromium } from 'playwright';
import { expect, test } from '@playwright/test';

test('Add items to shopping cart and place order', async ({ page }) => {
  // Open the products page
  await page.goto('http://127.0.0.1:3000/products.html');

  // Click on a product to add to cart
  await page.click('text=Crispy Chicken');

  // Wait for the shopping cart icon to update
  await page.waitForSelector('text=1', { timeout: 5000 });

  // Click on the shopping cart icon
  await page.click('#shoppingCart');

  // Verify that the product is added to the shopping cart
  await page.waitForSelector('text=Crispy Chicken');

  // Click on "Place Order" button
  await page.click('text=Place Order');

  // Fill in the checkout form
  await page.fill('#name', 'John Doe');
  await page.fill('#email', 'john@example.com');
  await page.fill('#phone', '1234567890');
  await page.fill('#address', '123 Main St');
  await page.fill('#city', 'New York');
  await page.fill('#zipcode', '10001');
  await page.fill('#card-number', '4111111111111111');
  await page.fill('#expiry', '1225');
  await page.fill('#cvv', '123');

  // Submit the form
  await page.click('text=Place Order');

  // Wait for the order confirmation
  await page.waitForSelector('text=Your order has been placed');

  // Verify that the order is placed successfully
  expect(await page.textContent('text=Your order has been placed')).toBeTruthy();
});
