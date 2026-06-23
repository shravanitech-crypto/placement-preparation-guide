const express = require("express");
const router = express.Router();

const User = require("../models/user");


// ======================
// REGISTER
// ======================
router.post("/", async (req, res) => {
  try {

    const { fullName, email, mobile, department, year, username, password } = req.body;

    // Validation
    if (!fullName || !email || !mobile || !department || !year || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email or Username already exists" });
    }

    const newUser = new User({
      fullName,
      email,
      mobile,
      department,
      year,
      username,
      password
    });

    await newUser.save();

    res.json({ message: "Registration Successful ✅" });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server Error" });

  }
});


// ======================
// LOGIN
// ======================
router.post("/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.json({
      message: "Login Successful ✅",
      user: {
        fullName: user.fullName,
        username: user.username
      }
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server Error" });

  }

});


// ======================
// FORGOT PASSWORD
// ======================
router.post("/reset-password", async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update password
    user.password = password;

    await user.save();

    res.json({ message: "Password updated successfully ✅" });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server Error" });

  }

});

module.exports = router;