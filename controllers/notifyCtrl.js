const Notifies = require('../models/notifyModel')

const notifyCtrl = {
    createNotify: async (req, res) => {
        try {
            const { id, recipients, url, text, content, image } = req.body

            const notify = new Notifies({
                id, recipients, url, text, content, image
            })

            await notify.save()

            return res.json({ notify })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    removeNotify: async (req, res) => {
        try {
            console.log(req.params)
            const notify = await Notifies.findOneAndDelete({
                id: req.params.id,
                url: req.query.url
            })

            return res.json({ notify })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = notifyCtrl