const router = require("express").Router();
const User = require("../models/userModel");

router.put("/addmoderator", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.requestorId)
      return res
        .status(400)
        .json({ errorMessage: "requestor email not found in request" });
    const user = await User.findOne({email:req.body.requestorId});
    if (user.userType !== "admin") {
      return res.status(401).json({ errorMessage: "unauthorized" });
    }
    const updatedUser = User.find({});
    // const updatedUser = User.findOne({ email: req.body._id });
    console.log("moderator added");
    console.log(updatedUser);
    res.json(updatedUser);
  } catch (err) {
    res.json(err);
  }
});
router.put("/removemoderator", async (req, res) => {
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
    const updatedUser = User.findOneAndUpdate(
      { _id: req.body._id },
      { userType: "normal" }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
