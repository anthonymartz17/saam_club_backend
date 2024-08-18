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

comments.get("/:postId", async (req, res) => {
	const { postId } = req.params;
	try {
		const topLevelComments = await getTopLevelComments(postId);
		res.status(200).json(topLevelComments);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
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

comments.post("/", verifyToken, async (req, res) => {
	const { uid } = req.user;
	try {
		const newComment = await createComment({ ...req.body, user_uid: uid });
		res.status(201).json(newComment);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

comments.put("/:id", verifyToken, async (req, res) => {
	const { id } = req.params;
	const { uid } = req.user;
	try {
		const comment = await getCommentById(id);
		if (comment.user_uid !== uid) {
			return res.status(403).json({
				error: "Unauthorized. You can only update your own comments.",
			});
		}
		const updatedComment = await updateComment(id, req.body);
		res.status(200).json(updatedComment);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

comments.delete("/:id", verifyToken, async (req, res) => {
	const { id } = req.params;
	const { uid } = req.user;
	try {
		const comment = await getCommentById(id);
		if (comment.user_uid !== uid) {
			return res.status(403).json({
				error: "Unauthorized. You can only delete your own comments.",
			});
		}
		const deletedComment = await deleteComment(id);
		res.status(200).json(deletedComment);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = comments;
