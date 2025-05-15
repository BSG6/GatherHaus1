const Creator = require("../models/Creator");
const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User")
const Event = require("../models/event");
const axios = require("axios");

module.exports = {
    // onboarding only ref at signup
    getOnboarding: async (req, res) => {
            try {
                // use creator/onboarding.ejs and not onboarding.ejs bc there are multiple roles and the onboarding ejs are diff
            res.render("creator/onboarding", {user: req.user });
            } catch (err) {
            console.log(err);
            }
        },
        // createProfile
    createProfile: async (req, res) => {
        try {
                const existingCreator = await Creator.findOne({user: req.user._id})

                    if (existingCreator){
                        
                        console.log('Creators gone create')
                        // WHEN REDIRECTING 
                        return res.redirect("/creator/dashboard")
                    }
                    const newCreator = await Creator.create({
                        user: req.user._id,
                        bio: req.body.bio,
                        instagram: req.body.instagram,
                        tiktok: req.body.tiktok,
                        website: req.body.website,
                        
                    })
            return res.redirect("/creator/dashboard")
        }catch (err) {
            console.log("err in createProfile",err);
            return res.redirect("/creator/onboarding");
        }
    
    },    
    // edit profile/dashbaord
    getEditProfile: async (req, res) => {
        try {
            const events = await Event.find().sort({ date: -1 }).lean();

            const creator = await Creator.findOne({user: req.user._id})
            // this helps pull from the model (enum)
            const craftOptions = Creator.schema.path("craft").enumValues;
            res.render("creator/edit", { creator:creator, user: req.user, craftOptions, events});
        } catch (err) {
        console.log("err in getEditProfile",err);
                    // console.log("edit creator:", creator);
        return res.redirect("/creator/dashboard", {user: req.user, craftOptions})
        }
    },
     // update profile/dashbaord (after edit)
    updateProfile: async (req, res) => {
        try {
                await Creator.findOneAndUpdate({user: req.user._id},
                    // console.log("Updated bio:", updatedCreator.bio);
                    {
                        // you dont have to use 
                        name:req.body.name,
                        bio: req.body.bio,
                        instagram: req.body.instagram,
                        tiktok: req.body.tiktok,
                        website: req.body.website,
                        craft: req.body.craft,
                        location:req.body.location,
                        readyToCollab:req.body.readyToCollab === 'true',
                        collabMethod: req.body.collabMethod,
                    })
                
                    return res.redirect("/creator/dashboard")
        }catch (err) {
            console.log("err in updateProfile",err);
            return res.redirect("/creator/editCreator");
        }
    
},    
    getDashboard: async (req, res) => {
        try {
            // console.log("what is the current id", req.user._id)
            // .populate, populates specific data by id
            const creator = await Creator.findOne({user: req.user._id}).populate('eventsAttending').lean()
            const events = await Event.find({ createdBy: req.user._id }).sort({ date: -1 }).lean();
            const craftOptions = Creator.schema.path("craft").enumValues;

                    if (!creator){
                    // literally took us 1 hour to debug, and here I was thinking I was a pro at those highlights magazines back in the day lol, dont you EVER FORGET TO DIRECT your route "cries digital tears"
                        return res.redirect("/creator/onboarding")
                    }
                    
                    res.render("creator/dashboard", {
                        creator,
                        user: req.user,
                        events: creator.eventsAttending,
                        craftOptions, 
                        
                    });
                
        } catch (err) {
            console.log(" dashboard failed:", err);
            return res.redirect("/creator/onboarding")

        }
            // added for onboarding info that is missing
            // console.log("EVENTS", events);

                                                
    },
    imageUpload: async (req, res) => {
        try {
          // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
        // findoneandupdate bc the photo is getting pushed into an existing array, a new one isnt being made each time.
            await Creator.findOneAndUpdate({
                user: req.user.id},
                // Tony suggested push, ASK HOW TO INCLUDE CLOUDID, SEEMS LIKE IT NEEDS TO GET PUSHED TOGETHER, IS THAT POSSIBLE??
                // (dollarsign)push is just like the method .push() in JS it pushes into an array. it is a mongodb method that pushes into the database
                {
                    $push:{
                        images: {
                            url: result.secure_url,
                            cloudinaryId: result.public_id,
                            // break down  into anki** to further understand
                    },
                },
                
            });
            console.log("Photo has been added!");
            res.redirect("/creator/dashboard");
        } catch (err) {
            console.log("imageUpload failed", err);
            
        }
    },
    getProfile: async (req, res) => {
        try {
            const loggedInCreator = await Creator.findOne({ user: req.user._id }).lean();
        
            const creator = await Creator.findById(req.params.id)
                .populate("likedBy")
                .lean();
        
            if (!creator) {
                return res.status(404).render("404");
            }
        
            const user = await User.findById(creator.user).lean();
            const events = await Event.find().sort({ date: 1 }).lean();
        
            res.render("profile", {
                creator,
                user,
                events,
                loggedInCreator: req.user, //USER!!!!
            });
        
            } catch (err) {
            console.log("err in getProfile", err);
            res.status(404).render("404");
        }
    },
        // exports.getProfile = async (req, res) => {
            //   const creator = await Creator.findOne({ userName: req.params.userName });
            //   if (!creator) return res.status(404).send('Creator not found');
            //   res.render('creator/profile', { creator });
            // };
            
            createEvents: async (req, res) => {
                try {
                    // Upload image to cloudinary
                    // const result = await cloudinary.uploader.upload(req.file.path);
                    const events = await Event.find();
                    // const creator = await Creator.findOne({ user: req.user._id })
                    // .populate("eventsAttending")
                    // .lean();
                    // const user = await User.findById(creator.user).lean()
                    
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
            // events we not getting connected to the user, need to push them into the array
            await Creator.findOneAndUpdate(
                { user: req.user._id },
                { $push: { eventsAttending: newEvent._id } }
            );
            // const events = await Event.find().sort({ date: 1 }).lean();
            
            console.log("event has been added!", events);
            res.render("/creator/dasboard");
            } catch (err) {
                console.log("err creating event",err);
            }
        },
        
        getAllCreators:async (req, res) => {
            try {
                const creators = await Creator.find().populate("user").lean();
                res.render("creator/collab", { creators, user:req.user})
                
                }
                catch (err) {
                    console.error("err in getAllCreators", err);
                    res.status(500).render("error");
            }
        },
        
        //   likePost: async (req, res) => {
        //     try {
        //       await Post.findOneAndUpdate(
        //         { _id: req.params.id },
        //         {
        //           $inc: { likes: 1 },
        //         }
        //       );
        //       console.log("Likes +1");
        //       res.redirect(`/post/${req.params.id}`);
        //     } catch (err) {
        //       console.log(err);
        //     }
        //   },
        likeCreator: async (req, res) => {
            try {
                await Creator.findByIdAndUpdate(
                    req.params.id,
                    {
                    $inc: { likes: 1 },
                    $push: { likedBy: req.user._id },
                    }
                );
                console.log("Creator liked!");
                res.redirect(`/creator/profile/${req.params.id}`);
                } catch (err) {
                console.log(err);
                res.redirect("back");
            }
    },

    getPost: async (req, res) => {
        try {
        const post = await Post.findById(req.params.id);
        const comments = await Comment.find({post: req.params.id}).sort({createdAt: -1}).lean();
        res.render("post.ejs", { post: post, user: req.user, comments: comments });
        } catch (err) {
        console.log(err);
        }
    }
}

// come back and add flash messages,I dont fully understand them yet