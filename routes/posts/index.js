const express = require("express")
const router = express.Router()

const postsController = require("../../controllers/posts")
const middleware = require("../../middleware")

router.post("/", middleware ,postsController.postCreate)
router.get("/", middleware, postsController.fetchAllPosts)
router.get("/:id", middleware, postsController.fetchPostById)
// router.delete("/:id", middleware, postsController.deletePost)

module.exports = router
