const mongoose = require("mongoose");

const KeysSchema = new mongoose.Schema({
   auth: String,
   p256dh: String,
});

const SubscriptionSchema = new mongoose.Schema({
   endpoint: {
      type: String,
   },
   keys: KeysSchema,
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
