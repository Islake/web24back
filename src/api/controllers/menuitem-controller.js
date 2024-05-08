import {
  listAllItems,
  addItem,
  categoryList,
  allergenList,
  removeItem,
  listOrderItems,
  modifyItem
} from "../models/menuitem-model.js";

/**
 * Retrieves all items from the menu.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON object containing all menu items.
 */
const getAllItems = async (req, res) => {
  try {
    const items = await listAllItems();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Adds a new item to the menu.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON object confirming the addition of the new item.
 */
const postItem = async (req, res) => {
  const result = await addItem(req.body, req.file);
  if (result.menuitem_id) {
    res.status(201).json({ message: 'New item added.', result });
  } else {
    res.sendStatus(400);
  }
};

/**
 * Retrieves a list of all categories.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON object containing all categories.
 */
const getCategoryList = async (req, res) => {
  try {
    const categories = await categoryList();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Retrieves a list of all allergens.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON object containing all allergens.
 */
const getAllergenList = async (req, res) => {
  try {
    const allergens = await allergenList();
    res.json(allergens);
  } catch (error) {
    console.error('Error fetching allergens:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Deletes an item from the menu by name.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON object confirming the deletion of the item.
 */
const deleteItemByName = async (req, res) => {
  try {
    const result = await removeItem(req.params.name);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Retrieves items of a specific order by order ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON object containing items of the specified order.
 */
const getOrderItemsByOrderId = async (req, res) => {
  try {
    const items = await listOrderItems(req.params.id);
    res.json(items);
  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Modifies an item on the menu by name.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON object confirming the modification of the item.
 */
const putItem = async (req, res) => {
  try {
    const item = await modifyItem(req.body, req.params.name, req.file);
    if (item) {
      res.json(item);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error modifying item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export {
  getAllItems,
  deleteItemByName,
  postItem,
  getCategoryList,
  getAllergenList,
  getOrderItemsByOrderId,
  putItem
};
