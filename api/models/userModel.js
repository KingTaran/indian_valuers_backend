const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userType: {type: String, required: true},
  userName: { type: String, required: true },
  email: { type: String, required: true },
  profilePictureUrl: { type: String },
  savedBlogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  blogsPosted:[{type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
