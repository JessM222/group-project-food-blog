import { getUserWithUsername } from "../data/users-dao.js";
import { getUsernameFromJWT } from "../utils/jwt-utils.js";
/**
 * A middleware which will get the auth JWT from req.cookies.authToken, verify it, find the matching user, and add it to req.user.
 *
 * If any of those processes fail, a 401 status will be returned. Otherwise, the next() function will be called to continue executing
 * your route handlers.
 */
export async function requiresAuthentication(req, res, next) {
  if (!req.cookies.authToken) return res.sendStatus(401);

  try {
    const username = getUsernameFromJWT(req.cookies.authToken); // get username from JWT
    const user = await getUserWithUsername(username); // get user from the database

    if (!user) return res.sendStatus(401); // if user not found, return unauthorized

    req.user = user; // attaching user to the request object
    return next();
  } catch (err) {
    return res.sendStatus(401); // if token invalid, return unauthorized
  }
}
