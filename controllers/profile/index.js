const Profile = require("../../models/Profile")

const profileController = {
    profileCreateAndUpdate: async (req, res) => {
        const { location, description, skills, linkedIn, facebook, twitter } = req.body

        const profileObject = {}
        profileObject.user = req.user.id //adding a new key into 'profileObject' which is called user and assign the id which extract from middleware level

        if(location) profileObject.location = location
        if(description) profileObject.description = description

        profileObject.socialMedia = {}
        if(linkedIn) profileObject.socialMedia.linkedIn = linkedIn
        if(facebook) profileObject.socialMedia.facebook = facebook
        if(twitter) profileObject.socialMedia.twitter = twitter

        if(skills) {
            profileObject.skills = skills.split(",").map((skill) => skill.trim())
        }

        try {
            let profile = await Profile.findOne({user: req.user.id})

            if(profile) { //update profile
                profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileObject}, {new: true})
                return res.status(200).send({"Message": "Successfully updated the profile", "Data": profile})
            }

            profile = new Profile(profileObject) //create a new profile
            await profile.save()
            return res.status(200).send({"Message": "Successfully created a profile", "Data": profile})

        } catch (error) {
            res.status(500).send({"Message": "Error occurred while creating a profile", "Error": error.message})
        }
    },

    fetchAllProfiles: async (req, res) => {
        try {
            const profiles = await Profile.find()
            res.status(200).send({"Message": "Successfully fetched all records", "Data": profiles})

        } catch (error) {
            res.status(500).send({"Message": "Error occurred while fetching profiles", "Error": error.message})
        }
    }
}

module.exports = profileController
