import request from 'supertest';
import app from '../src/app.js';
import promisePool from '../src/utils/database.js'; // Import the database pool

describe('Menu Item Integration Tests', () => {
  // Test case for fetching all menu items
  it('should fetch all menu items', async () => {
    const response = await request(app).get('/api/v1/menu');
    expect(response.status).toBe(200);
    // Add more assertions to validate the response body, etc.
  });

  // Test case for adding a new menu item
  it('should add a new menu item', async () => {
    const newItemData = {
      name: 'New Item',
      price: 10,
      description: 'New Item Description',
      category: 'New Category'
    };
    const response = await request(app)
      .post('/api/v1/menu')
      .field('name', newItemData.name)
      .field('price', newItemData.price)
      .field('description', newItemData.description)
      .field('category', newItemData.category)
      .attach('image', 'path/to/image.jpg'); // You need to provide the path to a valid image file
    expect(response.status).toBe(201);
    // Add more assertions to validate the response body, etc.
  });

  // Add more test cases for other CRUD operations on menu items

  // Add an afterAll hook to close the database connection
  afterAll(async () => {
    // Close the database connection pool
    await promisePool.end();
  });
});
