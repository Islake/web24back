/**
 * @api {get} /api/users Retrieve all users
 * @apiName GetAllUsers
 * @apiGroup Users
 *
 * @apiSuccess {Object[]} users List of users.
 */
userRouter.route('/')
  .get(getAllUsers) //List all users
  .post(
    validateUser,
    validationErrors,
    postUser); //Add new user

/**
 * @api {get} /api/users/:id/orders Retrieve orders by user ID
 * @apiName GetOrdersByUserId
 * @apiGroup Users
 *
 * @apiParam {Number} id User's ID.
 * @apiSuccess {Object[]} orders List of orders.
 */
userRouter.route('/:id/orders')
  .get(getOrdersByUserId) //List all users

/**
 * @api {get} /api/users/:identifier Retrieve user by ID or username
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {String|Number} identifier User's ID or username.
 * @apiSuccess {Object} user User object.
 */
/**
 * @api {put} /api/users/:identifier Modify user
 * @apiName PutUser
 * @apiGroup Users
 *
 * @apiParam {String|Number} identifier User's ID or username.
 * @apiParam {String} [avatar] User's avatar image file.
 * @apiSuccess {String} message Success message.
 */
/**
 * @api {delete} /api/users/:identifier Delete user
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiParam {String|Number} identifier User's ID or username.
 * @apiSuccess {String} message Success message.
 */
userRouter.route('/:identifier')
  .get(getUser) //Find user by ID or username
  .put(authenticateToken, upload.single('avatar'), putUser) //Modify user
  .delete(deleteUser); //Remove user
