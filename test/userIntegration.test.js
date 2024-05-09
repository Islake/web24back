const userModel = require('../src/api/models/user-model'); // replace with actual path
import promisePool from '../src/utils/database.js';


describe('User Model', () => {
  afterAll(async () => {
    // Close the database connection pool
    await promisePool.end();
  });

  it('should create a new user and return the user id', async () => {
    const newUser = {
      role: 'testRole',
      username: 'testUsername',
      password: 'testPassword',
      first_name: 'testFirstName',
      last_name: 'testLastName',
      address: 'testAddress',
      email: 'testEmail',
      phone: 'testPhone',
      avatar: 'testAvatar',
    };

    const result = await userModel.createUser(newUser);

    expect(result).toHaveProperty('user_id');
    expect(typeof result.user_id).toBe('number');
  });
});
