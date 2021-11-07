const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); // Importing the Post model

//Gets posts
router.get("/", async (req, res) => {
  //TODO: Add search functionality
  if (req.params.slug) {
  } else {
  }
  const per_page = req.query.limit || 10;
  const page = req.query.page || 1;
  const paginaton = {
    limit: per_page,
    offset: per_page * (page - 1),
  };
  try {
    posts = await Post.find()
      .limit(parseInt(paginaton.limit))
      .skip(parseInt(paginaton.offset))
      .sort({ createdAt: -1 });
    if (posts.length === 0) {
      return res.status(404).json({ data: [] });
    }
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(500).json({ data: err });
  }
});

//Get post details
router.get("/:slug", async (req, res) => {
  try {
    const single_post = await Post.find({ slug: req.params.slug });
    if (!single_post) {
      return res.status(404).json({ data: null });
    }
    res.status(200).json({ data: single_post });
  } catch (err) {
    res.status(500).json({ data: err });
  }
});

//Delete a post
router.delete("/:postID", async (req, res) => {
  //Deleting with ID for some security.
  try {
    const deleted_post = await Post.findById(req.params.postID);
    if (!deleted_post) {
      return res.status(404).json({ data: null });
    }
    res.status(200).json({ data: deleted_post });
  } catch (err) {
    res.status(500).json({ data: err });
  }
});

//Update a post
router.patch("/:slug", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { slug: req.params.slug },
      { $set: req.body }
    );
    if (!updatedPost) {
      return res.status(404).json({ data: null });
    }
    res.status(200).json({ data: updatedPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: err });
  }
});

//Creates new post
router.post("/", async (req, res) => {
  const new_post = new Post({
    title: req.body.title,
    subtitle: req.body.subtitle,
    content: req.body.content,
  });

  try {
    const response = await new_post.save();
    res.status(200).json({ data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: err });
  }
});

module.exports = router;
