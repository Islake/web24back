import { chromium } from 'playwright';
import { expect, test } from '@playwright/test';

test('Menu page test', async ({ page }) => {
  // Open the menu page
  await page.goto('http://127.0.0.1:3000/menu.html');

  // Check if the page loads without errors
  expect(await page.title()).toBe('My Website');

  // Check if necessary elements exist
  expect(await page.isVisible('h2:has-text("Add or modify Menu")')).toBeTruthy();
  expect(await page.isVisible('button#edit-button')).toBeTruthy();
  expect(await page.isVisible('select#restaurant')).toBeTruthy();
  expect(await page.isVisible('input#date')).toBeTruthy();
  expect(await page.isVisible('select#items')).toBeTruthy();
  expect(await page.isVisible('button#add-item-button')).toBeTruthy();
  expect(await page.isVisible('div#selected-items')).toBeTruthy();
  expect(await page.isVisible('div#menu-for-date')).toBeTruthy();
  expect(await page.isVisible('p#error-message')).toBeTruthy();
  expect(await page.isVisible('button#add-new-menu-button')).toBeTruthy();
  expect(await page.isVisible('button#exit-button')).toBeTruthy();

  // Check if menu is displayed
  expect(await page.isVisible('div#lunch-menu-container')).toBeTruthy();

  // Check if edit button is displayed
  expect(await page.isVisible('button#edit-button')).toBeTruthy();
  await page.click('button#edit-button');

  // Check if edit menu form is displayed
  expect(await page.isVisible('form#menu-form')).toBeTruthy();
});
