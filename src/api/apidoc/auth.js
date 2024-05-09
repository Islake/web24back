/**
 * @api {post} /api/auth/login User login
 * @apiName UserLogin
 * @apiGroup Authentication
 *
 * @apiParam {String} username User's username.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {Object} user User object containing user information.
 * @apiSuccess {String} token JWT token for authentication.
 */

/**
 * @api {get} /api/auth/me Get current user
 * @apiName GetCurrentUser
 * @apiGroup Authentication
 *
 * @apiHeader {String} Authorization JWT token obtained during login.
 *
 * @apiSuccess {String} message Message confirming the validity of the token.
 * @apiSuccess {Object} user User object containing user information.
 */

/**
 * @api {post} /api/auth/forgot-password Initiate password reset
 * @apiName InitiatePasswordReset
 * @apiGroup Authentication
 *
 * @apiParam {String} email User's email address.
 *
 * @apiSuccess {String} resetLink Password reset link.
 */

/**
 * @api {get} /api/auth/reset-password/:user_id/:token Get reset password page
 * @apiName GetResetPasswordPage
 * @apiGroup Authentication
 *
 * @apiParam {Number} user_id User ID.
 * @apiParam {String} token Token for password reset.
 *
 * @apiSuccess {String} message Message confirming the success of the reset password page retrieval.
 */

/**
 * @api {post} /api/auth/reset-password/:user_id/:token Reset user's password
 * @apiName ResetPassword
 * @apiGroup Authentication
 *
 * @apiParam {Number} user_id User ID.
 * @apiParam {String} token Token for password reset.
 * @apiParam {String} newPassword New password.
 *
 * @apiSuccess {String} message Message confirming the successful password reset.
 */

