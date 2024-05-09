import request from 'supertest';
import app from '../src/app.js';
import promisePool from '../src/utils/database.js';


describe('Menu Item Endpoints', () => {
  // Test for GET /api/v1/items
  it('should fetch all menu items', async () => {
    const response = await request(app).get('/api/v1/items');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(/* Expected response body */);
  });

  // Test for GET /api/v1/items/category
  it('should fetch all menu item categories', async () => {
    const response = await request(app).get('/api/v1/items/category');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(/* Expected response body */);
  });

  // Test for GET /api/v1/items/allergen
  it('should fetch all allergens', async () => {
    const response = await request(app).get('/api/v1/items/allergen');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(/* Expected response body */);
  });
  afterAll(async () => {
  // Close the database connection pool
  await promisePool.end();
  });
});
