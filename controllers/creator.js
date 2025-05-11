const Creator = require("../models/Creator");
const cloudinary = require("../middleware/cloudinary");





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
                        website: req.body.website
                    })
            return res.redirect("/creator/dashboard")
        }catch (err) {
            console.log(err);
            return res.redirect("/creator/onboarding");
        }
    
    },    
    // edit profile/dashbaord
    getEditProfile: async (req, res) => {
        try {
            console.log("edit creator:", creator);
            const creator = await Creator.findOne({user: req.user._id})
            res.render("creator/editCreator", { creator: creator, user: req.user });
        } catch (err) {
        console.log(err);
        return res.redirect("/creator/onboarding")
        }
    },
     // update profile/dashbaord (after edit)
    updateProfile: async (req, res) => {
        try {
                await Creator.findOneAndUpdate({user: req.user._id},
                    {
                        // you dont have to use 
                        bio: req.body.bio,
                        instagram: req.body.instagram,
                        tiktok: req.body.tiktok,
                        website: req.body.website
                    })
                
                    return res.redirect("/creator/dashboard")
        }catch (err) {
            console.log(err);
            return res.redirect("/creator/editCreator");
        }
    
},    
    getDashboard: async (req, res) => {
        try {
            console.log("what is the current id", req.user._id)
            const creator = await Creator.findOne({user: req.user._id})
            // added for onboarding info that is missing
            if (!creator){
                // literally took us 2 hour
                return res.redirect("/creator/onboarding")
            }
        res.render("dashboard", { creator, user: req.user });
        } catch (err) {
        console.log(err);
        return res.redirect("/creator/onboarding")
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

// come back and add flash messages,I dont fully understand them yet.