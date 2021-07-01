const User = require('../Schemas/User')

const updateUser = async (req, res) => {
    const id = req.params.id
    const updates = req.body
    const options = { new: true }
    try {
        const updated = await User.findByIdAndUpdate(id, updates, options)
        res.status(200).json({ 'message': updated })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = {
    updateUser
}