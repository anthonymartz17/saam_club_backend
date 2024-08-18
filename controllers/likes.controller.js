const express = require("express");
const likes = express.Router();

const {
  addLike,
  removeLike,
  getLikesForPost,
  getLikesByUser,
} = require("../queries/likes.queries");

// Like a post
likes.post("/", async (req, res) => {
  const { user_id, posts_id } = req.body;

  try {
    const newLike = await addLike(user_id, posts_id);
    if (newLike) {
      res.status(201).json({ message: "Like added", like: newLike });
    } else {
      res.status(409).json({ message: "Like already exists" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding like", error: error.message });
  }
});

// Remove like from a post
likes.delete("/:user_id/:posts_id", async (req, res) => {
  const { user_id, posts_id } = req.params;

  try {
    const removedLike = await removeLike(user_id, posts_id);
    if (removedLike) {
      res.status(200).json({ message: "Like removed", like: removedLike });
    } else {
      res.status(404).json({ message: "Like not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing like", error: error.message });
  }
});

// Get all likes for a post
likes.get("/:posts_id", async (req, res) => {
  const { posts_id } = req.params;
  try {
    const likes = await getLikesForPost(posts_id);
    res.status(200).json(likes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting likes", error: error.message });
  }
});

// Get all posts liked by a user
likes.get("/user/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const likes = await getLikesByUser(user_id);
    res.status(200).json(likes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting likes", error: error.message });
  }
});

module.exports = { likes };
