const express = require("express");
const router = express.Router();

// Database
const Post = require("../models/post");

// Show Route

router.get("/:postId", async (req, res) => {
  try {
    let post = await Post.find({ _id: req.params.postId })
      .populate("userId", "-password -__v")
      .populate("cityId")
      .exec();

    res.json(post);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: 500, error: "Something went wrong. Please try again." });
  }
});

// Delete Post
router.delete("/:postId", async (req, res) => {
  /*   if (!req.session.currentUser) {
        return res.status(401).json({status: 401, error: 'Unauthorized. Log in and try again.'})
    } */

  try {
    let post = await Post.findById(req.params.postId);
    if (post.userId.toString() === req.session.currentUser) {
      let deletedPost = await post.deleteOne();
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: 500, error: "Something went wrong. Please try again." });
  }
});
module.exports = router;
