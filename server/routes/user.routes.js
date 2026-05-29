
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { registerUser, loginUser } = require("../controllers/user.controller");

// @route   POST /api/users/register
// @desc    Register a new user
// @access  
router.post("/register", registerUser);

// @route   POST /api/users/login
// @desc    Login a user
// @access  
router.post("/login", loginUser);   

module.exports = router;


