import request from 'supertest';
import app from '../src/app.js';
import promisePool from '../src/utils/database.js'; // Import the database pool

describe('POST /api/v1/orders', () => {
  it('should create a new order', async () => {
    // Define valid order data
    const orderData = {
      userId: 1,
      totalCost: 50,
      status: 'pending',
      restaurantId: 1
    };

    // Send POST request with valid order data
    const response = await request(app)
      .post('/api/v1/orders')
      .send(orderData);

    // Verify that the response status code is 201 (Created)
    expect(response.status).toBe(201);

    // Verify that the response contains the order ID
    expect(response.body).toHaveProperty('orderId');
    expect(response.body.orderId).toBeGreaterThan(0);
  });

  // Add an afterAll hook to close the database connection
  afterAll(async () => {
    // Close the database connection pool
    await promisePool.end();
  });
});
