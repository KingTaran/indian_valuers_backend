const mongoose = require('mongoose');
const Blog = require('../models/blogModel');

const categorySchema = new mongoose.Schema({
    categoryType: { type: String, required:true},
    categoryBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blog'}],
});

const BlogCategory = mongoose.model('blogcategory', categorySchema);
module.exports= BlogCategory;