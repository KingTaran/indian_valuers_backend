const mongoose = require("mongoose");
const Blog = require('../models/blogModel');

const userSchema = new mongoose.Schema({
  userType: {type: String, required: true},
  userName: { type: String, required: true },
  email: { type: String, required: true },
  profilePictureUrl: { type: String },
  savedBlogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'blog' }],
  blogsPosted:[{type: mongoose.Schema.Types.ObjectId, ref: 'blog' }],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
