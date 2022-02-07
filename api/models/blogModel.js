const mongoose = require('mongoose');
const User = require('../models/userModel');
const blogSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    category: [{ type: String, required: true }],
    content: { type: String, required: true },
    blogImage_Url: { type: String, required: true},
});

const Blog = mongoose.model("blog", blogSchema);
const NewBlog = mongoose.model('newBlog', blogSchema);

module.exports = {NewBlog,Blog};