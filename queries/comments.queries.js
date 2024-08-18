const db = require("../db/db-config");

async function getTopLevelComments(postId) {
  const topLevelComments = await db.any(
    "SELECT * FROM comments WHERE post_id = $1 AND parent_id IS NULL",
		[postId]
    );
    console.log("postId:", topLevelComments);
	return topLevelComments;
}

async function getCommentReplies(parentId) {
	const replies = await db.any(
		"SELECT * FROM comments WHERE parent_comment_id = $1",
		[parentId]
	);
	return replies;
}

async function getCommentById(commentId) {
	const comment = await db.oneOrNone("SELECT * FROM comments WHERE id = $1", [
		commentId,
	]);
	return comment;
}

async function createComment({
	post_id,
	parent_comment_id,
	user_id,
	user_uid,
	content,
}) {
	const newComment = await db.one(
		"INSERT INTO comments (post_id, parent_comment_id, user_id, user_uid, content) VALUES ($1, $2, $3, $4) RETURNING *",
		[post_id, parent_comment_id, user_id, user_uid, content]
	);
	return newComment;
}

async function updateComment(id, { content }) {
	const updatedComment = await db.one(
		"UPDATE comments SET content = $1 WHERE id = $2 RETURNING *",
		[content, id]
	);
	return updatedComment;
}

async function deleteComment(id) {
	const deletedComment = await db.one(
		"DELETE FROM comments WHERE id = $1 RETURNING *",
		[id]
	);
	return deletedComment;
} 

module.exports = {
	getTopLevelComments,
	getCommentReplies,
	getCommentById,
	createComment,
	updateComment,
	deleteComment,
};