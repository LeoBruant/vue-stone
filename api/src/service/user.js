import db from "../model.mjs";

/**
 * Creates a new user with the given email and password.
 * @param {string} email User's email address
 * @param {string} password Raw password
 * @returns {User} The newly created user
 */
export async function createUser(email, password) {
  const { id } = await db.User.create({
    email,
    password,
  });

  return { id, email };
}

/**
 * Finds a new user by criteria.
 * @param criteria
 * @param options
 * @returns {Promise<User[]>}
 */
export async function findAllUsers(criteria, options = {}) {
  return db.User.findAll({
    where: criteria,
    ...options,
    order: Object.entries(options.order || {}),
  });
}
