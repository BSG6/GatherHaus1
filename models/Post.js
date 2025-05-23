const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

  caption: { 
    type: String, 
    required: true },
  location: String,
  likes: Number,
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" },
  postType: { 
    type: String, 
    enum: ["general", "gatherBoard"], 
    default: "general" },
  willingToTravel: Boolean,
  collabType: String,
  availableUntil: Date,
  image: String,
  cloudinaryId: String,
  createdAt: { 
    type: Date, 
    default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
