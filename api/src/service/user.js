import db from "../model.mjs";
import crypto from "node:crypto";

/**
 * Creates a new user with the given email and password.
 * @param {string} name User's name
 * @param {string} email User's email address
 * @param {string} password Raw password
 * @returns {User} The newly created user
 */
export async function createUser(name, email, password) {
  const uuid = crypto.randomUUID();

  await db.User.create({
    name,
    email,
    password,
    uuid,
  });

  return { name, email, uuid };
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
 * @param {string} uuid
 * @param options
 * @returns {Promise<User>}
 */
export async function findOneUser(uuid, options = {}) {
  return db.User.findOne({
    where: { uuid },
    ...options,
    order: Object.entries(options.order || {}),
  });
}
