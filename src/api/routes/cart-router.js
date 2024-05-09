import express from 'express';
import {
  postOrder,
  getOrdersByUserId,
  postOrderItem,
  getAllOrders,
  putOrder
} from '../controllers/cart-controller.js';

/**
 * Express router for handling cart-related API routes.
 * @type {import('express').Router}
 */
const cartRouter = express.Router();

/**
 * Route for creating a new order.
 * @name POST /api/cart
 * @function
 * @memberof module:routes/cart-router
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {void}
 */
cartRouter.route('/')
  .post(postOrder)//Add a new order
  .get(getAllOrders); //Get all orders

/**
 * Route for retrieving orders by user ID.
 * @name GET /api/cart/:userId
 * @function
 * @memberof module:routes/cart-router
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {void}
 */
cartRouter.route('/:userId')
  .get(getOrdersByUserId); //Get orders by user id

/**
 * Route for adding a new order item or modifying an existing order.
 * @name POST/PUT /api/cart/:orderId/items
 * @function
 * @memberof module:routes/cart-router
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {void}
 */
cartRouter.route('/:orderId/items')
  .post(postOrderItem) //Add a new order item
  .put(putOrder); //Modify an order

export default cartRouter;
