/**
 * Express router handling authentication related routes.
 * Like login, password reset, etc.
 * @module routes/authRouter
 */

import express from 'express';
import {
  getMe,
  postLogin,
  initiatePasswordReset,
  getResetPassword,
  postResetPassword,
} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middlewares.js';

const authRouter = express.Router();

/**
 * Route for logging in.
 * @name post/api/v1/auth/login
 * @memberof module:routes/authRouter
 */

authRouter.route('/login').post(postLogin);


/**
 * Route for getting the current user.
 * @name get/api/v1/auth/me
 * @memberof module:routes/authRouter
 */
authRouter.route('/me').get(authenticateToken, getMe);

/**
 * Route for initiating a password reset.
 * @name post/api/v1/auth/forgot-password
 * @memberof module:routes/authRouter
 * @function
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {void}
 */
authRouter.route('/forgot-password')
  .post(initiatePasswordReset);

/**
 * Route for resetting a password.
 * @name get/api/v1/auth/reset-password/:user_id/:token
 * @function
 * @memberof module:routes/authRouter
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {void}
 */
authRouter.route('/reset-password/:user_id/:token')
  .get(getResetPassword)
  .post(postResetPassword);

export default authRouter;
