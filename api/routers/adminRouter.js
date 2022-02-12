const router = require("express").Router();
const User = require("../models/userModel");


router.put("/addmod", async (req, res) => {
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
    const updatedUser =await User.findOneAndUpdate({email: req.body.userEmail},{userType: 'moderator'});
    console.log("moderator added");
    console.log(updatedUser);
    res.json(updatedUser);
  } catch (err) {
    res.json(err);
  }
});
router.put("/removemod", async (req, res) => {
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
    const updatedUser =await User.findOneAndUpdate({email: req.body.userEmail},{userType: 'normal'});
    console.log("moderator removed");
    console.log(updatedUser);
    res.json(updatedUser);
  } catch (err) {
    res.json(err);
  }
});


module.exports = router;
