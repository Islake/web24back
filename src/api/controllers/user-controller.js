import bcrypt from 'bcrypt';
import {
  findUserById,
  userByUsername,
  createUser,
  listAllUsers,
  ordersByUserId,
  modifyUser,
  removeUser,
} from "../models/user-model.js";

/**
 * Get all users.
 * @param req The request object.
 * @param res The response object will have a list of all users.
 * @return {Promise<Object>} A list of all users.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get a user by ID or username.
 * @param req The request object must contain the user ID or username.
 * @param res The response object will have the user data if found.
 * @return {Promise<Object>} The user data if found.
 */
const getUser = async (req, res) => {
  try {
    const identifier = req.params.identifier;
    let user;
    if (!isNaN(identifier)) {
      user = await findUserById(identifier);
    } else {
      user = await userByUsername(identifier);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Send 404 response and exit
    }

    // Send user data if found
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get orders by user ID.
 * @param req The request object must contain the user ID.
 * @param res The response object will have a list of orders for the user.
 * @return {Promise<Object>} A list of orders for the user.
 */
const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await ordersByUserId(req.params.id);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Add a new user. The request body must contain the user data.
 * @param req The request object must contain the user data.
 * @param res The response object will have the new user data.
 * @return {Promise<Object>} The new user data.
 */
const postUser = async (req, res) => {
  try {
    const { username, password, first_name, last_name, address, email, phone, avatar } = req.body;

    const avatarValue = avatar || 'avatar4.jpg';

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = {
      role: 'customer',
      username,
      password: hashedPassword,
      first_name,
      last_name,
      address,
      email,
      phone,
      avatar: avatarValue};

    const result = await createUser(user);
    if (result) {
      res.json(result);
      //console.log('New user added:', result);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error });
  }
}

/**
 * Modify an existing user. The request body must contain the user data.
 * @param req The request object must contain the user data.
 * @param res The response object will have the modified user data.
 * @return {Promise<Object>} The modified user data.
 */
const putUser = async (req, res) => {
  try {
    const userId = req.params.identifier;
    const user = await findUserById(userId);
    if (!user) {
      return res.sendStatus(404).json({ error: `No user found with id ${userId}` });
    }

    if (req.file) {
      // If there is a file, update the user avatar
      req.body.avatar = req.file.filename;
    }

    const result = await modifyUser(req.body, userId);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error modifying user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Delete a user by ID.
 * @param req The request object must contain the user ID.
 * @param res The response object will have a message confirming the deletion.
 * @return {Promise<Object>} A message confirming the deletion.
 */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.identifier;
    const user = await findUserById(userId);
    if (!user) {
      return res.sendStatus(404).json({ error: `No user found with id ${userId}` });
    }

    const result = await removeUser(userId);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export {getAllUsers, getUser, getOrdersByUserId, postUser, putUser, deleteUser };
