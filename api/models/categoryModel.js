const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryType: { type: String, required:true},
    categoryBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}],
});

const BlogCategory = mongoose.model('blogcategory', categorySchema);
module.exports= BlogCategory;