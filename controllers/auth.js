const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Database

const db = require("../models");
const User = db.User;

router.post("/register", async (req, res) => {
  let errors = [];

  // Validation
  if (!req.body.name) errors.push({ message: `Please enter your name'` });
  if (!req.body.email) errors.push({ message: `Please enter your e-mail.'` });
  if (!req.body.password)
    errors.push({ message: `Please enter your password.'` });
  if (req.body.password !== req.body.password2)
    errors.push({ message: `Passwords do not match.'` });

  // If Errors, Respond with errors
  errors.length ? res.status(400).json({ status: 400, errors }) : null;

  // Check for existing user account
  try {
    let userExists = await User.find({ email: req.body.email });
    // If the user exists
    if (userExists)
      res.status(400).json({
        status: 400,
        errors: [{ message: "E-mail address has already been taken." }]
      });

    // Hash Password
    let hashedPassword = await bcrypt.hashSync(req.body.password, 10);

    // Create New User object
    let newUser = {};
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = hashedPassword;

    // Save New User
    let savedUser = await User.create(newUser);

    // Send Status
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Unexpected Server Issue" });
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({
      status: 400,
      error: "Please enter your e-mail or password"
    });

  // Find User by Email
  try {
    let foundUser = await User.findOne({ email: req.body.email });

    // If No User Found, Return Error
    if (!foundUser)
      return res
        .status(400)
        .json({ status: 400, error: "E-mail or password is incorrect" });

    // Compare Passwords
    let passwordMatch = bcrypt.compareSync(
      req.body.password,
      foundUser.password
    );

    // Return Error if Password Does Not Match
    passwordMatch == false
      ? res
          .status(400)
          .json({ status: 400, error: "E-mail or password is incorrect." })
      : null;
    // Create User Session
    req.session.currentUser = foundUser._id;
    res.status(200).json({ status: 200, currentUser: foundUser._id });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: 500, error: "Something went wrong. Please try again" });
  }
});
module.exports = router;
