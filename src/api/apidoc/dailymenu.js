/**
 * @api {get} /api/menu/:date Retrieve menu by date
 * @apiName GetMenuByDate
 * @apiGroup Menu
 *
 * @apiParam {String} date Date in YYYY-MM-DD format.
 *
 * @apiSuccess {Object[]} menu Menu items for the specified date.
 */

/**
 * @api {post} /api/menu Add a new daily menu
 * @apiName PostMenu
 * @apiGroup Menu
 *
 * @apiParam {String} day Date in YYYY-MM-DD format.
 * @apiParam {Number} restaurant_id ID of the restaurant.
 * @apiParam {String} food_items Food items for the menu.
 *
 * @apiSuccess {String} message Message indicating the success of the operation.
 */

/**
 * @api {get} /api/menu Retrieve menu by week and restaurant
 * @apiName GetMenuByWeekAndRestaurant
 * @apiGroup Menu
 *
 * @apiParam {String} start_date Start date of the week in YYYY-MM-DD format.
 * @apiParam {String} end_date End date of the week in YYYY-MM-DD format.
 * @apiParam {Number} restaurant_id ID of the restaurant.
 *
 * @apiSuccess {Object[]} menu Menu items for the specified week and restaurant.
 */
