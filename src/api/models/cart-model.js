import promisePool from '../../utils/database.js';

/**
 * Adds an order to the database.
 * @param {number} userId - The ID of the user placing the order.
 * @param {number} restaurantId - The ID of the restaurant for the order.
 * @param {number} totalCost - The total cost of the order.
 * @param {string} date - The date of the order.
 * @param {string} status - The status of the order.
 * @returns {Promise<Array>} - A promise that resolves to the inserted rows.
 * @throws {Error} - If there is an error adding the order.
 */
const addOrder = async (userId, restaurantId, totalCost, date, status) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO `order` (user_id, restaurant_id, total_cost, date, status) VALUES (?, ?, ?, ?, ?)',
      [userId, restaurantId, totalCost, date, status]
    );
    return rows;
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
};

/**
 * Retrieves orders for a specific user from the database.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array>} - A promise that resolves to the retrieved rows.
 * @throws {Error} - If there is an error fetching the orders.
 */
const getOrdersByUser = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM `order` WHERE user_id = ?',
      [userId]
    );
    return rows;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

/**
 * Adds an order item to the database.
 * @param {number} menuitemId - The ID of the menu item.
 * @param {number} orderId - The ID of the order.
 * @param {number} quantity - The quantity of the order item.
 * @returns {Promise<Array>} - A promise that resolves to the inserted rows.
 * @throws {Error} - If there is an error adding the order item.
 */
const addOrderItem = async (menuitemId, orderId, quantity) => {
  //console.log(menuitemId, orderId, quantity);
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO orderitem (menuitem_id, order_id, quantity) VALUES (?, ?, ?)',
      [menuitemId, orderId, quantity]
    );
    return rows;
  } catch (error) {
    console.error('Error adding order item:', error);
    throw error;
  }
};

/**
 * Retrieves orders with a status of "pending" from the database.
 * @returns {Promise<Array>} - A promise that resolves to the retrieved rows.
 * @throws {Error} - If there is an error fetching the orders.
 */
const getOrders = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM `order` WHERE status = "pending"');
    return rows;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

/**
 * Modifies the status of an order in the database.
 * @param {string} status - The new status of the order.
 * @param {number} orderId - The ID of the order.
 * @returns {Promise<Array>} - A promise that resolves to the updated rows.
 * @throws {Error} - If there is an error modifying the order.
 */
const modifyOrder = async (status, orderId) => {
  try {
    const [rows] = await promisePool.execute(
      'UPDATE `order` SET status = ? WHERE order_id = ?',
      [status, orderId]
    );
    return rows;
  } catch (error) {
    console.error('Error modifying order:', error);
    throw error;
  }
};

export { getOrdersByUser, addOrderItem, addOrder, getOrders, modifyOrder };
