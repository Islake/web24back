import request from 'supertest';
import app from '../src/app.js';
import promisePool from '../src/utils/database.js'; // Import the database pool

describe('Menu Item Integration Tests', () => {
  // Test case for fetching all menu items
  it('should fetch all menu items within a date range for a specific restaurant', async () => {
    const startDate = '2022-04-23';
    const endDate = '2022-04-25';
    const restaurantId = 1;

    const response = await request(app).get(`/api/v1/menu?start_date=${startDate}&end_date=${endDate}&restaurant_id=${restaurantId}`);

    expect(response.status).toBe(200);

  });
  // Add an afterAll hook to close the database connection
  afterAll(async () => {
    // Close the database connection pool
    await promisePool.end();
  });
});
