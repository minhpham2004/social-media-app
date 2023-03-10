const Users = require("../models/userModel")

const userCtrl = {
    searchUser: async (req, res) => {
        try {
            const users = await Users.find({ username: { $regex: req.query.username } })
                .limit(10).select("fullname username avatar")

            if (users.length === 0) return res.status(400).json({ msg: "No user found" })

            res.json({ msg: 'ok', users })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select('-password')
                .populate("followers following", "-password")

            if (!user) return res.status(400).json({ msg: "User does not exist" })
            res.json({ user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateUser: async (req, res) => {
        try {
            const { avatar, fullname, mobile, address, story, website, gender } = req.body
            if (!fullname) return res.status(400).json({ msg: "Please add your full name." })

            await Users.findOneAndUpdate({ _id: req.user._id }, {
                avatar, fullname, mobile, address, story, website, gender
            })

            res.json({ msg: "Update Successfully!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    follow: async (req, res) => {
        try {
            const user = await Users.find({ _id: req.params.id, followers: req.user._id })
            if (user.length > 0) return res.status(400).json({ msg: 'You have followed this user.' })

            await Users.findOneAndUpdate({ _id: req.params.id }, {
                $push: { followers: req.user._id }
            }, { new: true })

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                $push: { following: req.params.id }
            }, { new: true })

            res.json({ msg: 'Followed User' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    unfollow: async (req, res) => {
        try {
            await Users.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { followers: req.user._id }
            }, { new: true })

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                $pull: { following: req.params.id }
            }, { new: true })

            res.json({ msg: 'UnFollow User' })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = userCtrl