const Post = require("../models/Post");
const webpush = require("web-push");

const { getSubscriptions } = require("./subscription");

exports.createPost = async (req, res, next) => {
   // Push notification
   webpush.setVapidDetails(
      "mailto:milton.chandradas@sap.com",
      process.env.PUBLIC_VAPID_KEY,
      process.env.PRIVATE_VAPID_KEY
   );

   try {
      const post = await Post.create(req.body);
      res.status(201).json({
         success: true,
         data: post,
      });

      const payload = JSON.stringify({
         title: "New post added in Handyman app",
         content: post.title,
      });

      const subscriptions = await getSubscriptions();

      console.log("Subscriptions: ", JSON.stringify(subscriptions));

      subscriptions.forEach((subscription) => {
         webpush.sendNotification(subscription, payload);
      });
   } catch (err) {
      res.status(400).json({ success: false });
   }
};
