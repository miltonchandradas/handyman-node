const Subscription = require("../models/Subscription");
const webpush = require("web-push");

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

      const payload = JSON.stringify({ title: "Push test..." });
      webpush.sendNotification(requestBody, payload);
   } catch (err) {
      res.status(400).json({ success: false });
   }
};
