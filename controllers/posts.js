const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Creator = require("../models/Creator");

module.exports = {
  // to get all gather board posts 
  getGatherBoard: async (req, res) => {
    try {     
      
        const posts = await Post.find().sort({ createdAt: "desc" }).populate("user").lean();

      for (const post of posts) {
        const creator = await Creator.findOne({ user: post.user._id }).lean();
        // just in case there is an issue with user/creator id
        post.creatorId = creator ? creator._id:null;
      
      const comments = await Comment.find({ post: post._id }).populate("user").sort({ createdAt: -1 }).lean();
    post.comments = comments
    }
      

  
      res.render("gatherBoard.ejs", { posts, messages: req.flash(), });
    } catch (err) {
      console.log(err);
      res.status(500).send("Error loading Gather Board");
    }
  },
  
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("user").lean();
      const comments = await Comment.find({post: req.params.id}).sort({createdAt: -1}).populate("user").lean();
      const creator = await Creator.findOne({ user: post.user._id }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments,creatorId:creator?._id });
    } catch (err) {
      console.log("Error in getPost:", err);
      res.status(500).render("error", { message: "Unable to load post." });
    }
  },
  createPost: async (req, res) => {
    try {       console.log("body:", req.body);
      console.log("file:", req.file);
      let image = ""
      let cloudinaryId = ""
  
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        image = result.secure_url 
        cloudinaryId = result.public_id
      }
  
      await Post.create({
        title: req.body.title,
        image,
        cloudinaryId,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
        // make sure to add "post types later"
        postType: 'general',
        location: req.body.location,
        willingToTravel: req.body.willingToTravel === 'on',
        collabType: req.body.collabType,
        availableUntil: req.body.availableUntil ? new Date(req.body.availableUntil) : null
      });
  
      console.log("Post has been added!");
      res.redirect("/post/gatherBoard");
    } catch (err) {
      console.log("Error in createPost:", err);
      res.status(500).send("Failed to create post");
    }
  },
  
  // createPost: async (req, res) => {
  //   try {
  //     // Upload image to cloudinary
  //     const result = await cloudinary.uploader.upload(req.file.path);

  //     await Post.create({
  //       title: req.body.title,
  //       image: result.secure_url || "",
  //       cloudinaryId: result.public_id || "",
  //       caption: req.body.caption,
  //       likes: 0,
  //       user: req.user.id,
  //       postType: req.body.postType || 'gatherBoard',
  //       location: req.body.location,
  //       willingToTravel: req.body.willingToTravel === 'on', // checkbox logic
  //       collabType: req.body.collabType,
  //       availableUntil: req.body.availableUntil ? new Date(req.body.availableUntil) : null
  //     });
  //     console.log("Post has been added!");
  //     res.redirect("/post/gatherBoard");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
