const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            reactionType: {
                type: String
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Posts = mongoose.model("posts", postsSchema)
