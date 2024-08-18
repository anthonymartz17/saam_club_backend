const express = require("express");

const comments = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");

const {
	getTopLevelComments,
	getCommentReplies,
	getCommentById,
	createComment,
	updateComment,
	deleteComment,
} = require("../queries/comments.queries");

comments.get("/:postId/top-level-comments", async (req, res) => {
	const { postId } = req.params;
	try {
		const topLevelComments = await getTopLevelComments(postId);
		res.status(200).json(topLevelComments);
	} catch (error) {
		res
			.status(500)
			.json({ error: "Internal Server Error", msg: error.message });
	}
});

comments.get("/:commentId/replies", async (req, res) => {
	const { commentId } = req.params;
	try {
		const replies = await getCommentReplies(commentId);
		res.status(200).json(replies);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

comments.get("/:commentId", async (req, res) => {
	const { commentId } = req.params;
	try {
		const comment = await getCommentById(commentId);
		if (comment) {
			res.status(200).json(comment);
		} else {
			res.status(404).json({ error: "Comment not found" });
		}
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

comments.post("/", async (req, res) => {
	try {
		const newComment = await createComment({ ...req.body, user_uid: "test1" });
		res.status(201).json(newComment);
	} catch (error) {
		res
			.status(500)
			.json({ error: "Internal Server Error", msg: error.message });
	}
});

comments.put("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const comment = await getCommentById(id);

		const updatedComment = await updateComment(id, req.body);
		res.status(200).json(updatedComment);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

comments.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
    const comment = await getCommentById(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

		const deletedComment = await deleteComment(id);
		res.status(200).json(deletedComment);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error", msg: error.message });
	}
});

module.exports = comments;
