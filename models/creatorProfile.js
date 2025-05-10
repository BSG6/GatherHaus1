const mongoose = require("mongoose");

const CreatorSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    bio: {
        type: String,
        default: "",
    },
    profileImage: {
        type: String,
        // had true, but means theyre unable to sign up without pic
        require: false,
    },
    cloudinaryId: {
        type: String,
        require: true,
    },
    images: {
        type: [String],
        // prev. default equaled "", it should be an array. multiple images cant push into a string.
        default: "",
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
    likes: {
        type: Number,
        default: 0,
    },
    eventsAttending: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Creator", CreatorSchema);


// mongoose.Schema.Types.ObjectId ref :"" / you always need this when you have to reference an id