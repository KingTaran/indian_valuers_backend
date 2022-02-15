const router = require("express").Router();
const User = require("../models/userModel");
const dotenv = require("dotenv");

router.post("/signup", async (req, res) => {
  try {
    const newUser = new User({
      userType: "normal",
      userName: req.body.userName,
      email: req.body.email,
      profilePictureUrl: req.body.profilePictureUrl,
      savedBlogs: [],
      blogsPosted:[],
    });
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/usertype", async (req, res) => {
  try {
    if (!req.body.email)
      return res
        .status(401)
        .json({ errorMessage: "email not found in request" });
    const user = await User.findOne({email:req.body.email});
    res.json({ userType: user.userType });
  } catch (err) {
    res.json(err);
  }
});
router.get("/getall", async (req, res) => {
  try {
    if (!req.body.requestorId)
      return res
        .status(400)
        .json({ errorMessage: "requestor email not found in request" });
    const user = await User.findOne({email: req.body.requestorId});
    if (user.userType !== "admin") {
      return res.status(401).json({ errorMessage: "unauthorized" });
    }
    const allUsers= await User.find({ userType: {$ne : 'admin' }},{userType:1, userName:1, email: 1})
    res.json(allUsers);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/", async (req, res) => {

  try {
    if (!req.body.requestorId)
      return res
        .status(400)
        .json({ errorMessage: "requestor email not found in request" });
    const user = await User.findOne({email: req.body.requestorId});
    if (user.userType !== "admin") {
      return res.status(401).json({ errorMessage: "unauthorized" });
    }
    const deletedUser= await User.deleteOne({email: req.body.email})
    res.json(deletedUser);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
