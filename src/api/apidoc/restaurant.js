/**
 * @api {get} /api/restaurants Retrieve all restaurants
 * @apiName GetAllRestaurants
 * @apiGroup Restaurants
 *
 * @apiSuccess {Object[]} restaurants List of restaurants.
 */
restaurantRouter.route('/')
  .get(getAllRestaurants); // Get all restaurants
