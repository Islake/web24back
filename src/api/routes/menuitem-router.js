/**
 * Express router providing menu item related routes.
 * @module routes/menuitemRouter
 */

import express from 'express';
import multer from 'multer';
import {
  getAllItems,
  getCategoryList,
  getAllergenList,
  deleteItemByName,
  postItem,
  getOrderItemsByOrderId,
  putItem
} from '../controllers/menuitem-controller.js';

const itemRouter = express.Router();

/**
 * Storage configuration for file upload.
 * @constant {object}
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    const originalFilename = file.originalname.split('.')[0].toLowerCase();
    const prefix = `${originalFilename}-${file.fieldname}`;

    let extension = 'jpg';

    if (file.mimetype === 'image/png') {
      extension = 'png';
    }

    const filename = `${prefix}-${suffix}.${extension}`;

    cb(null, filename);
  },
});

/**
 * Multer configuration for file upload.
 * @constant {object}
 */
const upload = multer({
  dest: 'uploads/',
  storage,
});

/**
 * Route for fetching all menu items.
 * @name get/api/v1/menu
 * @function
 * @memberof module:routes/menuitemRouter
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
itemRouter.route('/')
  .get(getAllItems) // List all items
  .post(upload.single('image'), postItem); // Add a new item

/**
 * Route for fetching all menu item categories.
 * @name get/api/v1/menu/category
 * @function
 * @memberof module:routes/menuitemRouter
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
itemRouter.route('/category')
  .get(getCategoryList); // List all categories

/**
 * Route for fetching all allergens.
 * @name get/api/v1/menu/allergen
 * @function
 * @memberof module:routes/menuitemRouter
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
itemRouter.route('/allergen')
  .get(getAllergenList); // List all allergens

/**
 * Route for deleting a menu item by name.
 * @name delete/api/v1/menu/:name
 * @function
 * @memberof module:routes/menuitemRouter
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
itemRouter.route('/:name')
  .delete(deleteItemByName) // Delete item by name
  .put(upload.single('image'), putItem); // Modify item

/**
 * Route for fetching order items by order ID.
 * @name get/api/v1/menu/orderItems/:id
 * @function
 * @memberof module:routes/menuitemRouter
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
itemRouter.route('/orderItems/:id')
  .get(getOrderItemsByOrderId); // Get orders for item by id

export default itemRouter;
