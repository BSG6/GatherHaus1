const mongoose = require("mongoose");

const CreatorSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require: true
    },
    name:{
        type:String,
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
        require: false,
    },
    images: [
        // Tony suggests paasing an object for images not just an array, easier for the cloudinary id and image to stay attached for deleting purposes, make this match in controller (uploadImage)
        {
            url:String,
            cloudinaryId:String,
        }
    ],
    location: String,
    craft: {
        type: String,
        required: false,
        enum:[
            "Baking", "Body Care", "Botanical Design", "Candle Making", "Ceramics", "Coaching",
            "Comics & Illustration", "Cultural Arts", "Custom Design", "Dance & Performance",
            "Education", "Fashion Design", "Fitness & Movement", "Food & Beverage", "Hair Care",
            "Home Decor", "Illustration", "Jewelry", "Jewelry Design", "Music", "Music & DJing",
            "Painting", "Photography", "Podcasting", "Poetry", "Skincare", "Sound Healing",
            "Spiritual Practice", "Storytelling", "Tech Projects", "Textile Arts", "Wellness",
            "Wellness Products", "Writing", "Other"
    ]
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
    // likes: {
    //     type: Number,
    //     default: 0,
    // },
    eventsAttending: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    readyToCollab: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Creator", CreatorSchema);


// mongoose.Schema.Types.ObjectId ref :"" / you always need this when you have to reference an id