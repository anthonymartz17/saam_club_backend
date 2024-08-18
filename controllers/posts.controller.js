const express = require("express");
const posts = express.Router();
const { getAllPosts, createPost, getPost, deletePost, updatePost } = require("../queries/posts.queries");


posts.get("/", async (req, res) => {
    const allPosts = await getAllPosts();
    if (allPosts) {
        res.status(200).json(allPosts);
    } else {
        res.status(404).json({ error: "server error" });
    }
});

posts.post("/", async (req, res) => {
    const post = await createPost(req.body);
    res.json(post);
} )

posts.get("/:id", async (req,res) => {
    const { id } = req.params;
    const post = await getPost(id);
    if (post) {
        res.json(post)
    } else {
        res.status(404).json({ error: "not found" });
    }
});

posts.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPost = await updatePost(id, req.body);
        res.status(200).json(updatedPost);
    } catch(error) {
        res.status(404).json({ error: `N0 post with the id ${id} exists`});
    }
});

posts.delete("/:id", async (req,res) => {
    const { id } = req.params;
    console.log(req.params);
    const deletedPost = await deletePost(id);
    if (deletePost) {
        res.status(200).json(deletePost);
    } else {
        req.status(404).json("Post not found");
    }
})




module.exports = posts;