const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const postsController = require("../../controllers/posts")
const middleware = require("../../middleware")

router.post("/", [check("text", "Text cannot be empty").not().isEmpty()], middleware ,postsController.postCreate)
router.get("/", middleware, postsController.fetchAllPosts)
router.get("/:id", middleware, postsController.fetchPostById)
router.delete("/:id", middleware, postsController.deletePost)
router.put("/like/:id", middleware, postsController.likePost)
router.post("/comment/:id", middleware, postsController.postComment)
router.delete("/comment/:postId/:commentId", middleware, postsController.deleteComment)
router.put("/comment/:postId/:commentId", middleware, postsController.updateComment)

module.exports = router
