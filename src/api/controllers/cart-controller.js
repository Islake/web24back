import {
  addOrder,
  getOrdersByUser,
  addOrderItem,
  getOrders,
  modifyOrder
} from "../models/cart-model.js";

/**
 * Handles the creation of a new order.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the order is created.
 */
const postOrder = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { totalCost, status, restaurantId } = req.body;
    const date = new Date(); // or get it from req.body if it's provided
    const order = await addOrder(userId, restaurantId, totalCost, date, status);

    // Send the order ID along with the response
    res.status(201).json({ orderId: order.insertId });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'Internal server error ' });
  }
};

/**
 * Retrieves all orders for a specific user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the orders.
 */
const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await getOrdersByUser(req.params.userId);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Handles the creation of a new order item.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the order item is created.
 */
const postOrderItem = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { menuitem_id, quantity } = req.body;

    // Check that all required properties are defined
    if (!menuitem_id || !quantity || !orderId) {
      res.status(400).json({ error: 'Missing required order item data' });
      return;
    }

    // Process the order item data and save it to the database
    await addOrderItem(menuitem_id, orderId, quantity);

    res.status(201).json({ message: 'Order item added successfully' });
  } catch (error) {
    console.error('Error adding order item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Retrieves all orders.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the orders.
 */
const getAllOrders = async (req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Updates the status of an order.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the order is updated.
 */
const putOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;

    // Check that all required properties are defined
    if (!status || !orderId) {
      res.status(400).json({ error: 'Missing required order data' });
      return;
    }

    // Process the order data and save it to the database
    await modifyOrder(status, orderId);

    res.status(201).json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {
  postOrder,
  getOrdersByUserId,
  postOrderItem,
  getAllOrders,
  putOrder
};
