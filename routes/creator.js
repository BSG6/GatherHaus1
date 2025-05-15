const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const creatorController = require("../controllers/creator");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// onboarding
router.get("/onboarding", ensureAuth, creatorController.getOnboarding)
router.post("/onboarding", ensureAuth, creatorController.createProfile);
// editing
router.get("/edit", ensureAuth, creatorController.getEditProfile)
router.put("/edit", ensureAuth, creatorController.updateProfile)
// createEvents
router.post("/edit", ensureAuth, creatorController.createEvents);
// dashboard
router.get("/dashboard", ensureAuth, creatorController.getDashboard)
// multer, image uploads
router.post("/imageUpload", upload.single("image"), creatorController.imageUpload)
// multer, profile upload
// router.post("/profileImageUpload", upload.single("profileImage"), creatorController.profileImageUpload)

// fdisplays all creators
router.get("/collab",ensureAuth, creatorController.getAllCreators);

// creator profile? do i need this??
router.get("/:id", creatorController.getProfile)


router.get('/profile/:id', creatorController.getProfile);
router.post("/like/:id", ensureAuth, creatorController.likeCreator);


//Post Routes - simplified for now
// router.get("/:id", ensureAuth, creatorController.getCreator);

// router.post("/createPost", upload.single("file"), creatorController.createCreator);

// router.put("/likePost/:id", createController.likeCreator);

// router.delete("/deletePost/:id", creatorController.deleteCreator);

module.exports = router;
