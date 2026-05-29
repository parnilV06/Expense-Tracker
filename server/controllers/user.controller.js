// user controller to handel login and registeration of users

const User = require("../models/User");
const userService = require("../services/user.services");

const toPublicUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
});

// register a new user 
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userService.createUser({ name, email, password });
        res.status(201).json(toPublicUser(user));
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
// login a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser({ email, password });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        } 
        res.status(200).json(toPublicUser(user));
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
