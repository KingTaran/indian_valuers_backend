const router = require("express").Router();
const { NewBlog, Blog } = require("../models/blogModel");
const User = require("../models/userModel");
const BlogCategory = require("../models/categoryModel");

router.get("/all", async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("author", "_id userName email");
    res.json(blogs);
  } catch (err) {
    res.json(err);
  }
});
router.get("/newblogs", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.requestorId)
      return res
        .status(400)
        .json({ errorMessage: "requestor email not found in request" });
    const user = await User.findOne({ email: req.body.requestorId });
    if (user.userType !== "admin" && user.userType !== "moderator") {
      return res.status(401).json({ errorMessage: "unauthorized" });
    }
    const blogs = await NewBlog.find({}).populate(
      "author",
      "_id userName email"
    );
    console.log("21blogs");
    console.log("blogs");
    res.json(blogs);
  } catch (err) {
    res.json(err);
  }
});

router.get("/byCategory:category", async (req, res) => {
  try {
    const blogsByCategory = BlogCategory.find({
      categoryType: req.params.category,
    }).populate("categoryBlogs");
    res.json(blogsByCategory);
  } catch (err) {
    res.send(err);
  }
});

router.post("/newblog", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.author });
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

router.post("/approve", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.requestorId)
      return res
        .status(400)
        .json({ errorMessage: "requestor email not found in request" });
    const requestor = await User.findOne({ email: req.body.requestorId });
    if (requestor.userType !== "admin" && requestor.userType !== "moderator") {
      return res.status(401).json({ errorMessage: "unauthorized" });
    }
    const approveBlog = await NewBlog.findOneAndDelete({
      _id: req.body.approvedblogId,
    });
    console.log(approveBlog);
    const newBlog = new Blog({
      author: approveBlog.author,
      title: approveBlog.title,
      date: approveBlog.date,
      category: approveBlog.category,
      content: approveBlog.content,
      blogImage_Url: approveBlog.blogImage_Url,
    });

    const approvedBlog = await newBlog.save();
    // const categoryAvailable = await BlogCategory.find( {categoryType : { $in : approveBlog.category}});
    // if (categoryAvailable) {
    //   const updatedCategory = await BlogCategory.findOneAndUpdate( {categoryType : { $in : approveBlog.category}}, { $push: { categoryBlogs: approvedBlog._id }});
    // }
    const updatedUser = await User.findByIdAndUpdate(approvedBlog.author, {
      $push: { blogsPosted: approvedBlog._id },
    });
    res.send(approvedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post("/reject", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.requestorId)
      return res
        .status(400)
        .json({ errorMessage: "requestor email not found in request" });
    const user = await User.findOne({email :req.body.requestorId});
    if (user.userType !== "admin" && user.userType !== "moderator") {
      return res.status(401).json({ errorMessage: "unauthorized" });
    }
    const rejectedBlog = await NewBlog.findOneAndDelete({
      _id: req.body.rejectedBlogId,
    });

    res.send(rejectedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.delete("/delete", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.requestorId)
      return res
        .status(400)
        .json({ errorMessage: "requestor email not found in request" });
    const user = await User.findOne({email :req.body.requestorId});
    if (user.userType !== "admin" && user.userType !== "moderator") {
      return res.status(401).json({ errorMessage: "unauthorized" });
    }
    const deletedBlog = await Blog.findOneAndDelete({
      _id: req.body.deletedBlogId,
    });
    const updatedUser = await User.findByIdAndUpdate(deletedBlog.author, {
      $pull: { blogsPosted: deletedBlog._id },
    });
    res.send(deletedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
router.put("/save", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.requestorId)
      return res
        .status(400)
        .json({ errorMessage: "requestor email not found in request" });
    const updatedUser = await User.findOneAndUpdate({email: req.body.requestorId}, {
      $push: { savedBlogs: req.body.blogId },
    });
    res.send(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
router.put("/unsave", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.requestorId)
      return res
        .status(400)
        .json({ errorMessage: "requestor email not found in request" });
    const updatedUser = await User.findOneAndUpdate({email: req.body.requestorId}, {
      $pull: { savedBlogs: req.body.blogId },
    });
    res.send(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
