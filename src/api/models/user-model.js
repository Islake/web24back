import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM user');
    return rows;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

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
 * Find a user by username. The username must be provided.
 * @param username {string} Username
 * @returns {Promise<*|boolean>} Promise object represents the user object or false if the user is not found.
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
 * @param user {object}
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
