const mongoose = require("mongoose")
const Schema = mongoose.Schema

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user" //referring user collection on MongoDB with ObjectId 
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    education: [
        {
            schoolName: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],

    skills: [String],

    socialMedia: {
        linkedIn: {
            type: String
        },
        facebook: {
            type: String
        },
        twitter: {
            type: String
        }
    }
})

module.exports = Profile = mongoose.model("profile", profileSchema)
