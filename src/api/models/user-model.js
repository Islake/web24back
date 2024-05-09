import promisePool from '../../utils/database.js';

/**
 * Fetches all users from the database.
 * @return {Promise<Array>} Promise object represents an array of users.
 * @throws {Error} Database error.
 */
const listAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM user');
    return rows;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

/**
 * Find a user by ID. The user ID must be provided.
 * @param id {number} User ID
 * @return {Promise<Object|boolean>} Promise object represents the user object or false if the user is not found.
 * @throws {Error} Database error.
 */
const findUserById = async (id) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM user WHERE user_id = ?', [id]);
    if (rows.length === 0) {
      return false;
    }
    return rows[0];
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
};

/**
* Adds a new menu item to the database.
* @param {string} username - Name of the menu item.
 *@returns {Promise<Object|boolean>} Promise object represents the result of the operation.
 * @throws {Error} Database error.
 */
const userByUsername = async (username) => {
  const sql = `SELECT * FROM user WHERE username = ?`;
  const [rows] = await promisePool.execute(sql, [username]);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
}

/**
 * Find a user by email. The email must be provided.
 * @param email {string} Email address
 * @returns {Promise<*|boolean>}  Promise object represents the user object or false if the user is not found.
 * @throws {Error} Database error.
 */
const userByEmail = async (email) => {
  const sql = `SELECT * FROM user WHERE email = ?`;
  const [rows] = await promisePool.execute(sql, [email]);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];

}

/**
 * Fetches all orders for a user. The user ID must be provided.
 * @param id
 * @return {Promise<Object>} Promise object represents a user object.
 * @throws {Error} Database error.
 */
const ordersByUserId = async (id) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM `order` WHERE user_id = ?', [id]);
    return rows;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

/**
 * Create a new user. The user object must have the following properties:
 * role, username, password, first_name, last_name, address, email, phone, avatar
 * @param {object} user User object
 * @param {number} user.role User role
 * @param {string} user.username Username
 * @param {string} user.password Password
 * @param {string} user.first_name First name
 * @param {string} user.last_name Last name
 * @param {string} user.address Address
 * @param {string} user.email Email
 * @param {string} user.phone Phone number
 * @param {string} user.avatar Avatar image
 * @returns {Promise<{user_id: number}|boolean>}
 * @throws {Error} Database error.
 */
const createUser = async (user) => {
  try {
    const {role, username, password, first_name, last_name, address, email, phone, avatar} = user;
    const sql = `INSERT INTO user (role ,username, password, first_name, last_name, address, email, phone, avatar)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [role, username, password, first_name, last_name, address, email, phone, avatar];
    const rows = await promisePool.execute(sql, params);
    if (rows[0].affectedRows === 0) {
      return false;
    }
    return {user_id: rows[0].insertId};
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};


/**
 * Modify a user. The user object must have the following properties:
 * role, username, password, first_name, last_name, address, email, phone, avatar
 * @param {object} user User object
 * @param {number} user.role User role
 * @param {string} user.username Username
 * @param {string} user.password Password
 * @param {string} user.first_name First name
 * @param {string} user.last_name Last name
 * @param {string} user.address Address
 * @param {string} user.email Email
 * @param {string} user.phone Phone number
 * @param {string} user.avatar Avatar image
 * @param {number} id User ID
 * @return {Promise<{message: string}|boolean>} Promise object represents the result of the operation.
 */
const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE user SET ? WHERE user_id = ?`,
    [user, id]);
  const rows = await promisePool.execute(sql);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

/**
 * Change the password for a user. The user id and new password must be provided.
 * @param id {number} User ID
 * @param password {string} New password
 * @returns {Promise<{message: string}|boolean>} Promise object represents the result of the operation.
 * @throws {Error} Database error.
 */
const changePassword = async (id, password) => {
  const sql = `UPDATE user SET password = ? WHERE user_id = ?`;
  const rows = await promisePool.execute(sql, [password, id]);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { message: 'success' };
};

/**
 * Remove a user from the database. The user id must be provided.
 * @param id {number} User ID
 * @returns {Promise<{message: string}|boolean>} Promise object represents the result of the operation.
 * @throws {Error} Database error.
 */
const removeUser = async (id) => {
  const sql = `DELETE FROM user WHERE user_id = ?`;
  const rows = await promisePool.execute(sql, [id]);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
}

export {
  listAllUsers,
  userByUsername,
  userByEmail,
  findUserById,
  ordersByUserId,
  createUser,
  modifyUser,
  changePassword,
  removeUser
};
