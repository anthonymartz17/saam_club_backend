const express = require("express");
const likes = express.Router();

const {
	addLike,
	removeLike,
	getLikesForPost,
	getLikesByUser,
	getLikeByUserAndPostId,
} = require("../queries/likes.queries");

// toggle like on a post
likes.post("/post/:post_id/user/:user_id/toggleLike", async (req, res) => {
	const { user_id, post_id } = req.params;

	try {
		const existingLike = await getLikeByUserAndPostId(user_id, post_id);
		if (existingLike) {
			await removeLike(user_id, post_id);
			res
				.status(200)
				.json({ liked: false, message: "Like removed successfully" });
		} else {
			await addLike(user_id, post_id);
			res.status(201).json({ liked: true, message: "Like added successfully" });
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error toggling like", error: error.message });
	}
});

// Get all likes for a post
likes.get("/post/:post_id", async (req, res) => {
	const { post_id } = req.params;
	try {
		const likes = await getLikesForPost(post_id);
		if (likes.length > 0) {
			res.status(200).json(likes);
		} else {
			res.status(404).json({ message: "No likes found for this post" });
		}
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
		if (likes.length > 0) {
			res.status(200).json(likes);
		} else {
			res.status(404).json({ message: "No likes found for this user" });
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error getting likes", error: error.message });
	}
});

module.exports = { likes };
