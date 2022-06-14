const Posts = require("../../models/Posts")
const User = require("../../models/User")

const postsController = {
    postCreate: async (req, res) => {
        const { text } = req.body

        try {
            const user = await User.findById(req.user.id).select("name") //get selected data, for exclude -> .select("-name")
            
            const newPost = new Posts({
                user: req.user.id,
                name: user.name,
                text: text
            })
            const post = await newPost.save()
            return res.status(200).send({"Message": "Successfully created a post", "Data": post})

        } catch (error) {
            return res.status(400).send({"Message": "Error occurred while creating a post", "Error": error.message})
        }
    },

    fetchAllPosts: async (req, res) => {
        try {
            const allPosts = await Posts.find().sort({date: -1})
            return res.status(200).send({"Message": "Successfully fetched all posts", "Date": allPosts})

        } catch (error) {
            return res.status(400).send({"Message": "Error occurred while fetching all posts", "Error": error.message})
        }
    },

    fetchPostById: async (req, res) => {
        const { id } = req.params

        try {
            const post = await Posts.findOne({id})
            return res.status(200).send({"Message": "Successfully fetched the post", "Data": post})

        } catch (error) {
            return res.status(400).send({"Message": "Error occurred while fetching the post", "Error": error.message})
        }
    },

    deletePost: async (req, res) => {
        const { id } = req.params

        try {
            const post = await Posts.findOne({id})

            if(post.user.toString() !== req.user.id) {
                return res.status(400).send({"Message": "Only author can delete a post"})
            }

            await Posts.findByIdAndDelete(id)
            return res.status(200).send({"Message": "Successfully deleted the post"})

        } catch (error) {
            return res.status(400).send({"Message": "Error occurred while deleting the post", "Error": error.message})
        }
    },

    likePost: async (req, res) => {
        try {
            const { reactionType } = req.body

            const post = await Posts.findById(req.params.id);

            if(!post) {
                return res.status(400).send({"Message": "Post not found"})
            }

            // unlike logic
            const likedByUser = post.likes.filter((like) => like.user.toString() === req.user.id)

            if(likedByUser.length > 0) {
                const index = post.likes.findIndex((value) => value.user === req.user.id)
                post.likes.splice(index, 1)

            } else {
                // like logic
                post.likes.unshift({user: req.user.id, "reactionType": reactionType})
            }

            await post.save()
            return res.status(200).send({"Message": "Liked", "Date": post.likes})

        } catch (error) {
            return res.status(400).send({"Message": "Error occurred while liking the post", "Error": error.message})
        }
    },

    postComment: async (req, res) => {
        const { comment } = req.body

        try {
            const post  = await Posts.findById(req.params.id)
            const user = await User.findById(req.user.id).select("-password")

            if(!post) {
                return res.status(400).send({"Message": "Post not found"})
            }

            const newComment = {
                user: user.id,
                text: comment,
                name: user.name
            }

            post.comments.unshift(newComment)
            const commented = await post.save()
            return res.status(200).send({"Message": "Successfully commented to the post", "Data": commented})

        } catch (error) {
            return res.status(400).send({"Message": "Error occurred while commenting to the post", "Error": error.message})
        }
    },

    deleteComment: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.postId)

            if(!post) {
                return res.status(400).send({"Message": "Post not found"})
            }

            const comment = await post.comments.find((value) => value._id.toString() === req.params.commentId)

            if(!comment) {
                return res.status(400).send({"Message": "Comment not found"})
            }

            if(req.user.id !== comment.user.toString()) {
                return res.status(400).send({"Message": "Only author can delete a comment"})
            }

            const index = post.comments.findIndex((value) => value._id.toString() === req.params.commentId)
            console.log(index);
            post.comments.splice(index, 1)
            const deleted = await post.save()
            res.status(200).send({"Message": "Successfully deleted the comment", "Data": deleted})

        } catch (error) {
            res.status(400).send({"Message": "Error occurred while commenting to the post", "Error": error.message})
        }
    },

    // updateComment: async (req, res) => {

    // }
}

module.exports = postsController
