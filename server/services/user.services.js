// service to handel registeration and login of users

const User = require("../models/User"); 
// register a new user
exports.createUser = async ({ name, email, password }) => {
    const user = new User({ name, email, password });
    return await user.save();
}
// login a user
exports.loginUser = async ({ email, password }) => {
    const user = await
        User.findOne({ email, password });
    return user;
}
