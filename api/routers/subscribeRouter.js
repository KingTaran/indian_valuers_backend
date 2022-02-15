const router = require("express").Router();
const Subscriber = require("../models/newsletterModel");

router.post("/subscribe", async (req, res) => {
    try {
        const newSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            phoneNumber : req.body.phoneNumber,
        });
        const savedSubscriber = await newSubscriber.save();
        res.send(savedSubscriber);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;
