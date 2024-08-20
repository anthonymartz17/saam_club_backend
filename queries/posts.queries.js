const db = require("../db/db-config");

const getAllPosts = async () => {
    const allPost = await db.any(`
        SELECT 
            posts.id,
            posts.user_uid,
            posts.content,
            posts.created_at,
            posts.updated_at,
            users.username,
            CAST(COUNT(DISTINCT likes.user_id) AS INTEGER) AS like_count,
            CAST(COUNT(DISTINCT comments.id) AS INTEGER) AS comment_count
        FROM 
            posts
        LEFT JOIN 
            users ON posts.user_id = users.id
        LEFT JOIN 
            likes ON posts.id = likes.posts_id
        LEFT JOIN 
            comments ON posts.id = comments.posts_id
        GROUP BY 
            posts.id, posts.user_uid, posts.content, posts.created_at, posts.updated_at, users.username
        ORDER BY 
            posts.created_at DESC
    `);
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
  
        const onePost = await db.oneOrNone(`
        SELECT 
            posts.id,
            posts.user_uid,
            posts.content,
            posts.created_at,
            posts.updated_at,
            users.username,
            CAST(COUNT(DISTINCT likes.user_id) AS INTEGER) AS like_count,
            CAST(COUNT(DISTINCT comments.id) AS INTEGER) AS comment_count
        FROM 
            posts
        LEFT JOIN 
            users ON posts.user_id = users.id
        LEFT JOIN 
            likes ON posts.id = likes.posts_id
        LEFT JOIN 
            comments ON posts.id = comments.posts_id
        WHERE
            posts.id = $1
        GROUP BY 
            posts.id, posts.user_uid, posts.content, posts.created_at, posts.updated_at, users.username
    `, id);
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
        return updatedPost;

}



const deletePost = async (id) => {

        const deletedPost = await db.one(
            "DELETE FROM posts WHERE id=$1 RETURNING *", id
        );
        return deletedPost;


};


module.exports = { getAllPosts, createPost, getPost, updatePost, deletePost };