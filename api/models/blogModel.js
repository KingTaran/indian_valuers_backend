const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    category: [{ type: String, required: true }],
    content: { type: String, required: true },
    blogImage_Url: { type: String, required: true},
});

const Blog = mongoose.model("blog", blogSchema);
const NewBlog = mongoose.model('newBlog', blogSchema);

module.exports = {NewBlog,Blog};