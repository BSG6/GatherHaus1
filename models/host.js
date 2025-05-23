const mongoose = require("mongoose");

const CreatorSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    bio: {
        type: String,
        text: "",
    },
    profileImage: {
        type: String,
        require: true,
    },
    cloudinaryId: {
        type: String,
        require: true,
    },
    instagram: {
        type: String,
        default: "",
    },
    tiktok:{
        type: String,
        default: "",
    },
    website:{
        type: String,
        default:""
    },
    images: {
        type: [String],
        default: "",
    },
    // caption: {
    //     type: String,
    //     required: true,
    // },
    likes: {
        type: Number,
        required: true,
    },
    eventsAttending: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Creator", CreatorSchema);
