/**
 * @apiDefine BaseRoutes API Base Routes
 *
 * This file sets up the base routes for each section of the API:
 * - /users: User related endpoints
 * - /items: Menu item related endpoints
 * - /orders: Order related endpoints
 * - /auth: Authentication related endpoints
 * - /restaurants: Restaurant related endpoints
 * - /menu: Daily menu related endpoints
 *
 * The actual API endpoints are defined within the respective routers.
 */
/**
 * Express router configuration for the API endpoints.
 * @module api/index
 */
import express from 'express';
import userRouter from './routes/user-router.js';
import itemRouter from './routes/menuitem-router.js';
import authRouter from './routes/auth-router.js';
import restaurantRouter from './routes/restaurant-router.js';
import menuRouter from './routes/dailymenu-router.js';
import cartRouter from './routes/cart-router.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/items', itemRouter);
router.use('/orders', cartRouter);
router.use('/auth', authRouter);
router.use('/restaurants', restaurantRouter);
router.use('/menu', menuRouter);

export default router;
