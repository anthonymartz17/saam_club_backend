const db = require("../db/db-config");

const getAllPosts = async () => {
  
        const allPost = await db.any("SELECT * FROM posts ");
        return allPost;

};

const createPost = async (post) => {

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
};

const getPost = async (id) => {
  
        const onePost = await db.oneOrNone("SELECT * FROM posts WHERE id = $1", id);
        return onePost;

}

const updatePost = async (id, post) => {

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

}



const deletePost = async (id) => {

        const deletedPost = await db.one(
            "DELETE FROM posts WHERE id=$1 RETURNING *", id
        );
        return deletePost;


};


module.exports = { getAllPosts, createPost, getPost, updatePost, deletePost };