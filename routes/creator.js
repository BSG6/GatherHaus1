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
// dashboard
router.get("/dashboard", ensureAuth, creatorController.getDashboard)

//Post Routes - simplified for now
// router.get("/:id", ensureAuth, creatorController.getCreator);

// router.post("/createPost", upload.single("file"), creatorController.createCreator);

// router.put("/likePost/:id", createController.likeCreator);

// router.delete("/deletePost/:id", creatorController.deleteCreator);

module.exports = router;
