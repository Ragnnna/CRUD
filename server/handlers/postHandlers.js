const User = require('../Schemas/User')
const { validationResult } = require('express-validator')

const createProfile = async (req, res) => {
    const options = { new: true }
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ message: errors.array() })
    }

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        dateRegister: Date.now().toString(),
        city: req.body.city,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        token: req.body.token,
        main: req.body.main
    })

    try {
        await newUser.save()
        if(!newUser.main){
            return res.status(200).json(newuser)
        }
        const newuser = await User.findByIdAndUpdate(newUser._id, { token: newUser._id }, options)
        res.status(200).json(newuser)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const loginProfile = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ message: errors.array() })
    }

    try {
        const user = await User.find({ 'email': req.body.email })
        const password = user[0].password
        const email = user[0].email
        if(password !== req.body.password || email !== req.body.email){
            return res.status(400).json({ message: "hahaha data go brrrrr" })
        }
        res.status(200).json({ user: user[0] })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = {
    createProfile,
    loginProfile
}