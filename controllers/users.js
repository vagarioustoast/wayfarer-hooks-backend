const express = require("express");
const router = express.Router();

// Database
const User = require("../models/user");

router.get("/:userId", async (req, res) => {
  try {
    let user = await User.find(
      { _id: req.params.userId },
      { password: 0, __v: 0 }
    );

    // Does the User Exist?
    !user
      ? res.status(404).json({ status: 404, error: "User not found" })
      : null;

    let userPosts = await User.find({ userId: req.params.userId })
      .populate({ path: "userId", select: "name" })
      .exec();

    res.json({ user, userPosts });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: 500, error: "Something went wrong. Please try again." });
  }
});

module.exports = router;
