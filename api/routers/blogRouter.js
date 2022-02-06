const router = require('express').Router();
const {NewBlog,Blog}= require('../models/blogModel');
const User = require('../models/userModel');
const BlogCategory= require('../models/categoryModel');



router.get('/all', async(req, res)=>{
    try { 
        const blogs = await Blog.find({}).populate('author');
        res.json(blogs);
      } catch (err) {
        res.json(err);
      }
});
router.get('/newblogs', async(req, res)=>{
    try {
        console.log(req.body);
    if (!req.body.requestorId)
      return res
        .status(400)
        .json({ errorMessage: "requestor email not found in request" });
    const user = await User.findOne({_id:req.body.requestorId});
    if (user.userType !== "admin" || user.userType !=='moderator') {
      return res.status(401).json({ errorMessage: "unauthorized" });
    }
        const blogs = await NewBlog.find({});
        res.json(blogs);
      } catch (err) {
        res.json(err);
      }
});

router.get('/byCategory:category', async(req, res)=>{
    try {
    const   blogsByCategory= BlogCategory.find({categoryType: req.params.category}).populate('categoryBlogs');
        res.json(blogsByCategory);
    } catch (err) {
       res.send(err); 
    }
});

router.post('/newblog', async(req, res)=>{
    try {
    const user = await User.findById(req.body.requestorId);
        console.log(req.body);
        const newBlog = new NewBlog({
            author: user._id,
            title: req.body.title,
            date: new Date(),
            category: req.body.categories,
            content: req.body.content,
            blogImage_Url: req.body.blogImage_Url,
        });
        const savedBlog = await newBlog.save();
        res.send(savedBlog);
      } catch (err) {
        console.error(err);
        res.status(500).send();
      }
});

router.post('/approve:id', async(req, res)=>{

    try {
        console.log(req.body);
        if (!req.body.requestorId)
          return res
            .status(400)
            .json({ errorMessage: "requestor email not found in request" });
        const requestor = await User.findById(req.body.requestorId);
        if (requestor.userType !== "admin" || requestor.userType !=='moderator') {
          return res.status(401).json({ errorMessage: "unauthorized" });
        }
        const approveBlog = await NewBlog.remove({_id: req.body.id});
        console.log(req.body);
        const newBlog = new Blog(approveBlog);
        const approvedBlog = await newBlog.save();
        const updatedUser = await User.findOneAndUpdate(
            { _id: approveBlog.author }, 
            { $push: { postedBlogs: approveBlog._id } },
            done
        );
        res.send(approvedBlog);
      } catch (err) {
        console.error(err);
        res.status(500).send();
      }
});

router.post('/reject:id', async(req, res)=>{
    try {
        console.log(req.body);
        if (!req.body.requestorId)
          return res
            .status(400)
            .json({ errorMessage: "requestor email not found in request" });
        const user = await User.findById(req.body.requestorId);
        if (user.userType !== "admin" || user.userType !=='moderator') {
          return res.status(401).json({ errorMessage: "unauthorized" });
        }
        const rejectedBlog = await NewBlog.findByIdAndDelete(req.body._id);
     
        res.send(rejectedBlog);
      } catch (err) {
        console.error(err);
        res.status(500).send();
      }
});

router.delete('/delete:id', async(req, res)=>{
    try {
        console.log(req.body);
        if (!req.body.requestorId)
          return res
            .status(400)
            .json({ errorMessage: "requestor email not found in request" });
        const user = await User.findById(req.body.requestorId);
        if (user.userType !== "admin" || user.userType !=='moderator') {
          return res.status(401).json({ errorMessage: "unauthorized" });
        }
        const deletedBlog = await Blog.findByIdAndDelete(req.body._id);
        res.send(deletedBlog);
      } catch (err) {
        console.error(err);
        res.status(500).send();
      }
});

module.exports = router;