const router = require("express").Router();
const User = require("../models/userModel");
const dotenv = require("dotenv");

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new User({
      userType: "normal",
      userName: req.body.userName,
      email: req.body.email,
      profilePictureUrl: req.body.profilePictureUrl,
      savedBlogs: [],
      blogsPosted:[],
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.send(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/getusertype", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.email)
      return res
        .status(401)
        .json({ errorMessage: "email not found in request" });
    const user = await User.findById(req.body.email);
    res.json({ userType: user.userType });
  } catch (err) {
    res.json(err);
  }
});
router.get("/allusers", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.requestorId)
      return res
        .status(400)
        .json({ errorMessage: "requestor email not found in request" });
    const user = await User.findById(req.body.requestorId);
    if (user.userType !== "admin") {
      return res.status(401).json({ errorMessage: "unauthorized" });
    }
    const allUsers= User.find({ userType: {$ne : 'admin' }},{userType:1, userName:1, email: 1})
    res.json({ userType: user.userType });
  } catch (err) {
    res.json(err);
  }
});

router.delete("/", async (req, res) => {
  res.send("test");
  const { phoneNumber, password, passwordVerify } = req.body;
  const existingUser = await User.findOneAndUpdate(
    { phoneNumber },
    { password: "a password" }
  );
});

module.exports = router;
