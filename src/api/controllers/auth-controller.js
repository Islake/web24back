import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {
  changePassword,
  findUserById,
  userByEmail,
  userByUsername
} from '../models/user-model.js';
import 'dotenv/config';


/**
 * Authenticate a user by username and password.
 * Function will check if the user exists and if the password is correct.
 * If these are correct, it will create a token with the user's id, username and role using the JWT_SECRET.
 * The token will expire in 24 hours.
 * @api {post} /api/v1/auth/login Login user
 * @apiGroup Authentication
 *
 * @apiParam {String} username User's username
 * @apiParam {String} password User's password
 *
 * @apiSuccess {Object} user User's information
 * @apiSuccess {String} token User's token
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "user": {
 *    "user_id": 1,
 *    "username": "admin",
 *    "role": "admin"
 *  },
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIn0.6z7v1k0JQ3b5nLbR5qY0Zf4jgQyW1K8l3Xg7K7x5Z"
 *  }
 */
const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await userByUsername(username);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  if (!bcrypt.compareSync(password, user.password)) {
    res.sendStatus(401);
    return;
  }

  const userWithNoPassword = {
    user_id: user.user_id,
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  res.json({user: userWithNoPassword, token});
}


/**
 * Get the current user.
 * @param req The request object should get the users token from the local storage.
 * If there is no token, the response object will have a status code of 401.
 * @param res The response object will have a status code of 401 if the user is not authenticated.
 * @returns {Promise<void>} The response object will have a JSON object with the user's information.
 */
const getMe = async (req, res) => {
  if (res.locals.user) {
    console.log('user', res.locals.user);
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.sendStatus(401);
  }
}

/**
 * Initiate a password reset.
 * @param req The request object has a body with the user's email.
 * Function will check if the user exists. If the user exists, it will create a token with the user's id and email.
 * @param res The response object will have a status code of 404 if the user does not exist.
 * @returns {Promise<void>} The response object will have a JSON object with a reset link.
 */
const initiatePasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await userByEmail(email);
  if (!user) {
    res.sendStatus(404);
    return;
  }

  const secret = process.env.JWT_SECRET + user.password;
  const payload = {
    user_id: user.user_id,
    email: user.email,
  };

  const token = jwt.sign(payload, secret, { expiresIn: '15m' });
  const link = `http://localhost:3000/api/v1/auth/reset-password/${user.user_id}/${token}`;
  console.log('Password reset link:', link);
  res.status(200).json({ resetLink: link });
}

/**
 * Get the reset password page. It will verify the token and user id.
 * @param req The request object has the user's id and token.
 * @param res The response object will have a status code of 404 if the user does not exist.
 * @returns {Promise<void>} The response object will have a status code of 500 if there is an error.
 * If there is no error, the response object will have a status code of 200.
 */
const getResetPassword = async (req, res) => {
  // Reset the user's password (you would implement this logic)
  const { user_Id, token } = req.params;
  console.log('User ID:', user_Id);

  const user = await findUserById(user_Id);
  if (!user) {
    res.sendStatus(404);
    return;
  }

  const secret = process.env.JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
  } catch (error) {
    console.error('Error resetting password:', error);
    res.sendStatus(500);
  }
}

/**
 * Reset the user's password. It will verify the token and user id.
 * @param req The request object has the user's id, token and new password.
 * If the new password is not provided, the response object will have a status code of 400.
 * @param res The response object will have a status code of 404 if the user does not exist.
 * @returns {Promise<void>} If the password is reset successfully, the response object will have a message.
 */
const postResetPassword = async (req, res) => {
  // Reset the user's password (you would implement this logic)
  const { user_id, token } = req.params;

  const user = await findUserById(user_id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const secret = process.env.JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    console.log('Payload:', payload);
    const { newPassword } = req.body;
    console.log('Password:', newPassword);

    if (!newPassword) {
      res.status(400).json({ message: 'Password is required' });
      return;
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await changePassword(user_id, hashedPassword);
    console.log(hashedPassword);
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    console.log('Response:', res);
    res.sendStatus(500);
  }
}

export {postLogin, getMe, getResetPassword, postResetPassword, initiatePasswordReset};
