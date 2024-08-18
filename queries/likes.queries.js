const db = require("../db/dbConfig.js");

// Like a post
const addLike = async (user_id, posts_id) => {
  const query = `
        INSERT INTO likes (user_id, posts_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        RETURNING *;
    `;
  const values = [user_id, posts_id];
  const res = await db.query(query, values);
  return res.rows[0];
};

// Remove like from a post
const removeLike = async (user_id, posts_id) => {
  const query = `
        DELETE FROM likes
        WHERE user_id = $1 AND posts_id = $2
        RETURNING *;
    `;
  const values = [user_id, posts_id];
  const res = await db.query(query, values);
  return res.rows[0];
};

// Get all like for a post
const getLikesForPost = async (posts_id) => {
  const query = `
        SELECT * FROM likes
        WHERE posts_id = $1;
    `;
  const values = [posts_id];
  const res = await db.query(query, values);
  return res.rows;
};

// Get all posts liked by a user
const getLikesByUser = async (user_id) => {
  const query = `
        SELECT * FROM likes
        WHERE user_id = $1;
    `;
  const values = [user_id];
  const res = await db.query(query, values);
  return res.rows;
};

module.exports = {
  addLike,
  removeLike,
  getLikesForPost,
  getLikesByUser,
};
