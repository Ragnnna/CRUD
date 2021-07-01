const User = require('../Schemas/User')

const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await User.deleteOne({ _id: id })
        res.status(200).json({ user: deleted })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = {
    deleteUser
}