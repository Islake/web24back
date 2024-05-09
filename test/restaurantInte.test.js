const restaurantModel = require('../src/api/models/restaurant-model');
import promisePool from '../src/utils/database.js';

describe('Restaurant Model', () => {
  afterAll(async () => {
    // Close the database connection pool
    await promisePool.end();
  });

  it('should fetch all restaurants', async () => {
    const result = await restaurantModel.listAllRestaurants();

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);

    expect(result[0]).toMatchObject({
      restaurant_id: 1,
      name: 'Sakura Sushi',
      address: '123 Sakura Ave'
    });

    expect(result[1]).toMatchObject({
      restaurant_id: 2,
      name: 'Zen Sushi Bar',
      address: '789 Zen Blvd'
    });
  });
});
