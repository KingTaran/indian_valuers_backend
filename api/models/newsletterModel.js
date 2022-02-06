const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
 
});

const Subscriber = mongoose.model("subscriber", subscriberSchema);
module.exports = Subscriber;
