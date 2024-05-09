/**
 * Functions for interacting with menu items in the database.
 * @module menuitemModel
 */

import promisePool from '../../utils/database.js';

/**
 * Fetches all menu items from the database.
 * @returns {Promise<Array>} Promise object represents an array of menu items.
 * @throws {Error} Database error.
 */
const listAllItems = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM menuitem');
    return rows;
  } catch (error) {
    console.error('Error fetching all menu items:', error);
    throw error;
  }
};

/**
 * Adds a new menu item to the database.
 * @param {Object} item - Menu item object.
 * @param {string} item.name - Name of the menu item.
 * @param {number} item.price - Price of the menu item.
 * @param {string} item.description - Description of the menu item.
 * @param {Array<string>} [item.allergen] - List of allergens in the menu item.
 * @param {string} item.category - Category of the menu item.
 * @param {string} image - Filename of the menu item image.
 * @returns {Promise<Object|boolean>} Promise object represents the result of the operation.
 * @throws {Error} Database error.
 */
const addItem = async (item, image) => {
  const { name, price, description, allergen, category } = item;
  const allergenValue = allergen ? allergen.join(', ') : "-";
  const sql = `INSERT INTO menuitem (name, price, description, allergen, category, image)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [name, price, description, allergenValue, category, image].map(
    (arvo) => {
      if (arvo === undefined) {
        return null;
      } else {
        return arvo;
      }
    }
  );

  try {
    const [rows] = await promisePool.execute(sql, params);
    if (rows.affectedRows === 0) {
      return false;
    }
    return { menuitem_id: rows.insertId };
  } catch (error) {
    console.error('Error adding a new menu item:', error);
    throw error;
  }
};

/**
 * Fetches a list of all menu item categories from the database.
 * @returns {Promise<Array>} Promise object represents an array of menu item categories.
 * @throws {Error} Database error.
 */
const categoryList = async () => {
  try {
    const [rows] = await promisePool.query('SELECT category FROM menuitem');
    return rows;
  } catch (error) {
    console.error('Error fetching menu item categories:', error);
    throw error;
  }
}

/**
 * Fetches a list of all allergens from the database.
 * @returns {Promise<Array>} Promise object represents an array of allergens.
 * @throws {Error} Database error.
 */
const allergenList = async () => {
  try {
    const [rows] = await promisePool.query('SELECT allergen FROM menuitem');
    return rows;
  } catch (error) {
    console.error('Error fetching allergens:', error);
    throw error;
  }
}

/**
 * Removes a menu item from the database.
 * @param {string} name - Name of the menu item to be removed.
 * @returns {Promise<Object|boolean>} Promise object represents the result of the operation.
 * @throws {Error} Database error.
 */
const removeItem = async (name) => {
  try {
    const [id_rows] = await promisePool.execute('SELECT menuitem_id FROM menuitem WHERE name = ?', [name]);

    if (id_rows.length === 0) {
      console.log('Menu item not found');
      return false;
    }

    const menuitem_id = id_rows[0].menuitem_id;

    const [orderitemrows] = await promisePool.execute('DELETE FROM orderitem WHERE menuitem_id = ?', [menuitem_id]);
    console.log('Deleted order items:', orderitemrows.affectedRows);

    const [rows] = await promisePool.execute('DELETE FROM menuitem WHERE menuitem_id = ?', [menuitem_id]);
    console.log('Deleted menu item:', rows.affectedRows);

    if (rows.affectedRows === 0) {
      console.log('Menu item not found');
      return false;
    }

    return { message: 'success' };

  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw error;
  }
};

/**
 * Fetches a list of menu items associated with a specific order.
 * @param {number} orderId - ID of the order.
 * @returns {Promise<Array>} Promise object represents an array of menu item names.
 * @throws {Error} Database error.
 */
const listOrderItems = async (orderId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT menuitem.name FROM orderitem INNER JOIN menuitem ON orderitem.menuitem_id = menuitem.menuitem_id WHERE orderitem.order_id = ?',
      [orderId]
    );
    return rows.map(row => row.name);
  } catch (error) {
    console.error('Error fetching order items:', error);
    throw error;
  }
}

/**
 * Modifies a menu item in the database.
 * @param {Object} item - Modified menu item object.
 * @param {string} id - ID of the menu item to be modified.
 * @param {Object} [file] - File object for the menu item image.
 * @returns {Promise<Object|boolean>} Promise object represents the result of the operation.
 * @throws {Error} Database error.
 */
const modifyItem = async (item, id, file) => {
  if (file) {
    item.image = file.filename;
  }

  const sql = promisePool.format(`UPDATE menuitem SET ? WHERE name = ?`, [item, id]);
  try {
    const [rows] = await promisePool.execute(sql);

    if (rows.affectedRows === 0) {
      return false;
    }
    return { message: 'success' };
  } catch (error) {
    console.error('Error modifying menu item:', error);
    throw error;
  }
}

export {
  listAllItems,
  categoryList,
  allergenList,
  removeItem,
  addItem,
  listOrderItems,
  modifyItem
};
