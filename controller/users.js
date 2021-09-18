const User = require("../models/User");

exports.getUsers = async (req, res, next) => {
   try {
      const users = await User.find();
      res.status(200).json({
         success: true,
         data: users,
      });
   } catch (err) {
      res.status(400).json({ success: false });
   }
};

exports.createUser = async (req, res, next) => {
   try {
      const user = await User.create(req.body);
      res.status(201).json({
         success: true,
         data: user,
      });
   } catch (err) {
      res.status(400).json({ success: false });
   }
};
