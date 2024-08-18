const db = require("../db/dbConfig.js");

// Like a post
const addLike = async (user_id, posts_id) => {
  const res = await db.oneOrNone(
    `INSERT INTO likes (user_id, posts_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *;`,
    [user_id, posts_id]
  );
  return res;
};

// Remove like from a post
const removeLike = async (user_id, posts_id) => {
  const res = await db.oneOrNone(
    `DELETE FROM likes WHERE user_id = $1 AND posts_id = $2 RETURNING *;`,
    [user_id, posts_id]
  );
  return res;
};

// Get all likes for a post
const getLikesForPost = async (posts_id) => {
  const res = await db.manyOrNone(`SELECT * FROM likes WHERE posts_id = $1;`, [
    posts_id,
  ]);
  return res;
};

// Get all posts liked by a user
const getLikesByUser = async (user_id) => {
  const res = await db.manyOrNone(`SELECT * FROM likes WHERE user_id = $1;`, [
    user_id,
  ]);
  return res;
};

module.exports = {
  addLike,
  removeLike,
  getLikesForPost,
  getLikesByUser,
};
