/**
 * @api {post} /api/cart Create a new order
 * @apiName PostOrder
 * @apiGroup Cart
 *
 * @apiParam {Number} userId User's ID.
 * @apiParam {Number} restaurantId ID of the restaurant for the order.
 * @apiParam {Number} totalCost Total cost of the order.
 * @apiParam {String} status Status of the order.
 * @apiSuccess {Object} order Order object.
 */
cartRouter.route('/')
  .post(postOrder)//Add a new order
  .get(getAllOrders); //Get all orders

/**
 * @api {get} /api/cart/:userId Retrieve orders by user ID
 * @apiName GetOrdersByUserId
 * @apiGroup Cart
 *
 * @apiParam {Number} userId User's ID.
 * @apiSuccess {Object[]} orders List of orders.
 */
cartRouter.route('/:userId')
  .get(getOrdersByUserId); //Get orders by user id

/**
 * @api {post} /api/cart/:orderId/items Add a new order item
 * @apiName PostOrderItem
 * @apiGroup Cart
 *
 * @apiParam {Number} orderId ID of the order.
 * @apiParam {Number} menuitem_id ID of the menu item.
 * @apiParam {Number} quantity Quantity of the order item.
 * @apiSuccess {String} message Success message.
 */
/**
 * @api {put} /api/cart/:orderId/items Modify an order
 * @apiName PutOrder
 * @apiGroup Cart
 *
 * @apiParam {Number} orderId ID of the order.
 * @apiParam {String} status New status of the order.
 * @apiSuccess {String} message Success message.
 */
cartRouter.route('/:orderId/items')
  .post(postOrderItem) //Add a new order item
  .put(putOrder); //Modify an order
