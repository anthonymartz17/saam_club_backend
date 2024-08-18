const db = require("../db/db-config");

const getAllPosts = async () => {
    try {
        const allPost = await db.any("SELECT * FROM posts ");
        return allPost;
    } catch (error) {
        return error;
    }
};

const createPost = async (post) => {
    try {
        const newPost = await db.one(
            "INSERT INTO posts (user_id, user_uid, content, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING * ",
            [
                post.user_id,
                post.user_uid,
                post.content,
                post.created_at,
                post.updated_at,

            ]
        );
        return newPost;
    } catch (error) {
        return error;
    }
};

const getPost = async (id) => {
    try {
        const onePost = await db.one("SELECT * FROM posts WHERE id = $1", id);
        return onePost;
    } catch(error) {
        return error;
    }
}

const updatePost = async (id, post) => {
    try {
        const updatedPost = await db.one(
            "UPDATE posts SET user_id=$1, user_uid=$2, content=$3, created_at=$4, updated_at=$5 WHERE id=$6 RETURNING *",
            [
                post.user_id,
                post.user_uid,
                post.content,
                post.created_at,
                post.updated_at,
                id, 
            ]
        );
        return updatePost;
    } catch(error) {
        return error;
    }
}



const deletePost = async (id) => {
    try {
        const deletedPost = await db.one(
            "DELETE FROM posts WHERE id=$1 RETURNING *", id
        );
        return deletePost;
    } catch(error) {
        return error;
    }

};


module.exports = { getAllPosts, createPost, getPost, updatePost, deletePost };