const Profile = require("../../models/Profile")

const profileController = {
    profileCreateAndUpdate: async (req, res) => {
        const { location, description, skills, linkedIn, facebook, twitter } = req.body

        const profileObject = {}
        profileObject.user = req.user.id //adding a new key into 'profileObject' which is called user and assign the id which extract from middleware level

        if(location) profileObject.location = location

        try {
            let profile = await Profile.findOne({user: req.user.id})

            if(profile) {
                profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileObject}, {new: true})
                return res.status(200).send({"Message": "Successfully updated the profile", "Data": profile})
            }

            profile = new Profile(profileObject)
            await profile.save()
            return res.status(200).send({"Message": "Successfully created a profile", "Data": profile})

        } catch (error) {
            res.status(500).send({"Message": "Error occurred while creating a profile"})
        }
    }
}

module.exports = profileController
