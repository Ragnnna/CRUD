const User = require('../Schemas/User')

const fetchUsers = async(req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({message: error})
    }
}

const fetchUser = async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.findOne({ _id: id })
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({message: error})
    }
}


module.exports = {
    fetchUsers,
    fetchUser
}