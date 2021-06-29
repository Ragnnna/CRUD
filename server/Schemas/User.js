const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    main: {
        type: Boolean,
        require: false
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: true
    },
    gender: {
        type: String,
        require: false
    },
    dateRegister: {
        type: String,
        require: false
    },
    city: {
        type: String,
        require: false
    },
    birthdate: {
        type: String,
        require: false
    },
    token: {
        type: String,
        require: false
    }
})

let userData = mongoose.model('User', userSchema)

module.exports = userData