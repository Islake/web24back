/**
 * @api {get} /api/menu Retrieve all menu items
 * @apiName GetAllItems
 * @apiGroup Menu
 *
 * @apiSuccess {Object[]} items Array of menu items.
 */

/**
 * @api {post} /api/menu Add a new menu item
 * @apiName PostItem
 * @apiGroup Menu
 *
 * @apiParam {String} name Name of the menu item.
 * @apiParam {Number} price Price of the menu item.
 * @apiParam {String} description Description of the menu item.
 * @apiParam {Array} [allergen] List of allergens in the menu item.
 * @apiParam {String} category Category of the menu item.
 * @apiParam {File} image Image of the menu item.
 *
 * @apiSuccess {String} message Message confirming the addition of the new item.
 */

/**
 * @api {get} /api/menu/category Retrieve all menu item categories
 * @apiName GetCategoryList
 * @apiGroup Menu
 *
 * @apiSuccess {Object[]} categories Array of menu item categories.
 */

/**
 * @api {get} /api/menu/allergen Retrieve all allergens
 * @apiName GetAllergenList
 * @apiGroup Menu
 *
 * @apiSuccess {Object[]} allergens Array of allergens.
 */

/**
 * @api {delete} /api/menu/:name Delete a menu item by name
 * @apiName DeleteItemByName
 * @apiGroup Menu
 *
 * @apiParam {String} name Name of the menu item to delete.
 *
 * @apiSuccess {String} message Message confirming the deletion of the menu item.
 */

/**
 * @api {put} /api/menu/:name Modify a menu item by name
 * @apiName PutItem
 * @apiGroup Menu
 *
 * @apiParam {String} name Name of the menu item to modify.
 * @apiParam {Number} [price] New price of the menu item.
 * @apiParam {String} [description] New description of the menu item.
 * @apiParam {Array} [allergen] New list of allergens in the menu item.
 * @apiParam {String} [category] New category of the menu item.
 * @apiParam {File} [image] New image of the menu item.
 *
 * @apiSuccess {String} message Message confirming the modification of the menu item.
 */

/**
 * @api {get} /api/menu/orderItems/:id Retrieve order items by order ID
 * @apiName GetOrderItemsByOrderId
 * @apiGroup Menu
 *
 * @apiParam {Number} id ID of the order.
 *
 * @apiSuccess {Object[]} items Array of menu items associated with the specified order.
 */
