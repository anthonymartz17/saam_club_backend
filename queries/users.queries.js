const db = require('../db');

const getUsers = async () => {
  try {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  } catch (err) {
    console.error(err);
    return null;
    }
  };

const getUserById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    console.error(err);
    return null;
    }
 };

const createUser = async (user) => {
  try {
    const result = await db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [user.name, user.email]);
    return result.rows[0];
  } catch (err) {
    console.error(err);
    return null;
    }
  };

const deleteUser = async (id) => {
  try {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (err) {
    console.error(err);
    return null;
    }
  };

const updateUser = async (id, user) => {
  try {
    const result = await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [user.name, user.email, id]);
    return result.rows[0];
  } catch (err) {
    console.error(err);
    return null;
    }
  };

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  };

