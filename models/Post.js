const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
   title: {
      type: String,
   },
   description: String,
   publishDate: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model("Post", PostSchema);
