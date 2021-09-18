const Subscription = require("../models/Subscription");
const webpush = require("web-push");

exports.getSubscriptions = async () => {
   try {
      const subscriptions = await Subscription.find();
      console.log("Subscriptions Find(): ", JSON.stringify(subscriptions));
      return subscriptions;
   } catch (err) {
      console.log("Error retrieving subscriptions: ", err);
      return [];
   }
};

exports.createSubscription = async (req, res, next) => {
   // Push notification
   webpush.setVapidDetails(
      "mailto:milton.chandradas@sap.com",
      process.env.PUBLIC_VAPID_KEY,
      process.env.PRIVATE_VAPID_KEY
   );

   const requestBody = req.body;

   try {
      const subscription = await Subscription.create(req.body);
      res.status(201).json({
         success: true,
      });

      const payload = JSON.stringify({
         title: "From Backend Server:  Successfully subscribed to Notification Service...",
      });
      webpush.sendNotification(requestBody, payload);
   } catch (err) {
      res.status(400).json({ success: false });
   }
};
