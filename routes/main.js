const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const creatorController= require("../controllers/creator")
const eventController= require("../controllers/event")



//Main Routes - simplified for now
router.get("/", homeController.getIndex);
// wondering if I should get rid of this/test later
router.get("/profile", ensureAuth, creatorController.getProfile);
// turn feed into 
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
// view user profile
router.get("/creator/profile/:id", creatorController.getProfile)
// Events
router.get("/events", ensureAuth, eventController.getAllEvents);

router.get("/events/add", eventController.getAddEventForm);
router.post("/events", ensureAuth, eventController.createEvents);

// eventbrite 




module.exports = router;
