const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
   },
   subTitleText: String,
   slug: String,
   description: String,
   projectedStartDate: {
      type: Date,
      default: Date.now,
   },
   projectedEndDate: {
      type: Date,
      default: Date.now,
   },
   estimatedCost: {
      type: Number,
      default: 100,
   },
   handyman: String,
   rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
      default: 5,
   },
});

module.exports = mongoose.model("Project", ProjectSchema);
