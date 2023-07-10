import db from "../model.mjs";

/**
 * Creates a new user with the given email and password.
 * @param {string} name User's name
 * @param {string} email User's email address
 * @param {string} password Raw password
 * @returns {User} The newly created user
 */
export async function createUser(name, email, password) {
  const { id } = await db.User.create({
    name,
    email,
    password,
  });

  return { id, name, email };
}

/**
 * Finds all users by criteria.
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

/**
 * Finds user by id.
 * @param id
 * @param options
 * @returns {Promise<User>}
 */
export async function findOneUser(id, options = {}) {
  return db.User.findOne({
    where: {id},
    ...options,
    order: Object.entries(options.order || {}),
  });
}
