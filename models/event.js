const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        
    },

    location: String,
    description: String,
    date: Date,
    link: String,
    image: {
        type: String,
        require: true,
    },
    cloudinaryId: {
        type: String,
        
    },
    caption: {
        type: String,
        
    },
    // likes: {
    //     type: Number,
    //     required: true,
    // },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    eventsAttending: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    }],
});

module.exports = mongoose.model("Event", EventSchema);
