import { chromium } from 'playwright';
import { expect, test } from '@playwright/test';

test('Products page test', async ({ page }) => {
  // Open the products page
  await page.goto('https://users.metropolia.fi/~wilmais/Websovelluskehitys/Projekti/HTML/products.html');

  // Check if the page loads without errors
  expect(await page.title()).toBe('Tuotteet');

  // Check if necessary elements exist
  expect(await page.isVisible('h2:has-text("Product List")')).toBeTruthy();
  expect(await page.isVisible('input#search')).toBeTruthy();
  expect(await page.isVisible('button#toggleFilterButton')).toBeTruthy();

  // Search for a product
  await page.fill('input#search', 'Product');
  expect(await page.isVisible('.productList')).toBeTruthy(); // Check if product list is visible

  // Toggle filters
  await page.click('button#toggleFilterButton');
  expect(await page.isVisible('.filter-container')).toBeTruthy(); // Check if filters are visible

  // Close filters
  await page.click('span#closeFilter');
  expect(await page.isVisible('.filter-container')).not.toBeTruthy(); // Check if filters are closed

  // Click on a product
  await page.click('.productList .product:first-child');
  expect(await page.isVisible('.modal')).toBeTruthy(); // Check if modal is visible

  // Close modal
  await page.click('.modal .close');
  expect(await page.isVisible('.modal')).not.toBeTruthy(); // Check if modal is closed
});
