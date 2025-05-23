const cloudinary = require("../middleware/cloudinary");
const Event = require("../models/event");
const Comment = require("../models/Comment");
const axios = require("axios");
const Creator = require("../models/Creator");

module.exports = {

    getAddEventForm: async (req, res) => {
        try {
            // date: -1 descending order by date
            const events = await Event.find().sort({ date: -1 }).lean();

            // can this be used later to find a specific event??? FUTURE
            // const event = await Event.findById(req.params.id);
            // const comments = await Comment.find({post: req.params.id}).sort({createdAt: -1}).lean();
            res.render("addEvent", { user: req.user });
        } catch (err) {
        console.log("err in getEvent", err);
        res.redirect("/creator/dashboard")
    }
},
getAllEvents: async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 }).lean();
        res.render("events/allEvents", {
            events,
            user: req.user
        });
        } catch (err) {
        console.log("err in getAllEvents", err);
        res.redirect("/creator/dashboard");
        }
},
createEvents: async (req, res) => {
        try {
        // Upload image to cloudinary
        // const result = await cloudinary.uploader.upload(req.file.path);
        // const events = await Event.find();
            const creator = await Creator.findOne({ user: req.user._id })
            const events = await Event.find().sort({ createdAt: -1 }).lean();

            const newEvent = await Event.create({
            title: req.body.title,
            location: req.body.location,
            description: req.body.description,
            date: req.body.date,
            link: req.body.link,
            // image: result.secure_url,
            // cloudinaryId: result.public_id,
            // caption: req.body.caption,
            // likes: 0,
            createdBy: req.user.id,
        });
        await Creator.findOneAndUpdate(
            { user: req.user._id },
            { $push: { eventsAttending: newEvent._id } }
        );
        console.log("Post has been added!");
        res.redirect("creator/dashboard");
        } catch (err) {
        console.log("err creating event",err);
        }
    }
}
    
    // likePost: async (req, res) => {
    //     try {
    //     await Post.findOneAndUpdate(
    //         { _id: req.params.id },
    //         {
    //         $inc: { likes: 1 },
    //         }
    //     );
    //     console.log("Likes +1");
    //     res.redirect(`/post/${req.params.id}`);
    //     } catch (err) {
    //     console.log(err);
    //     }
    // },
    // deletePost: async (req, res) => {
    //     try {
    //     // Find post by id
    //     let post = await Post.findById({ _id: req.params.id });
    //     // Delete image from cloudinary
    //     await cloudinary.uploader.destroy(post.cloudinaryId);
    //     // Delete post from db
    //     await Post.remove({ _id: req.params.id });
    //     console.log("Deleted Post");
    //     res.redirect("/profile");
    //     } catch (err) {
    //     res.redirect("/profile");
    //     }
    // },
    