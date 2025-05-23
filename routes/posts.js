const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const postsController = require("../controllers/posts");

//Post Routes - simplified for now


router.get("/gatherBoard", ensureAuth, postsController.getGatherBoard);

router.get("/gatherBoardPost", ensureAuth, (req, res) => {
    res.render("gatherBoardPost.ejs");
});

router.post("/createPost", upload.single("image"), postsController.createPost);
router.get("/:id", postsController.getPost);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
