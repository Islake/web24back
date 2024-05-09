import express from 'express';

import {
  getMenuByDate,
  postMenu,
  getMenuByWeekAndRestaurant
} from '../controllers/dailymenu-controller.js';

const menuRouter = express.Router();

/**
 * Route serving daily menu operations.
 * @name /
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
menuRouter.route('/')
  .post(postMenu) // Add a new dailymenu
  .get(getMenuByWeekAndRestaurant);

/**
 * Route serving daily menu operations for a specific date.
 * @name /:date
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
menuRouter.route('/:date')
  .get(getMenuByDate) // Get dailymenu by date

export default menuRouter;
