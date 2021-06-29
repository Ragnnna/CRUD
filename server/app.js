const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { body, validationResult } = require('express-validator')
require('dotenv').config()
const app = express()
const bodyParser = require('body-parser')

const User = require('./Schemas/User')




const PORT = process.env.PORT
const str = process.env.MONGO_KEY

app.use(cors())
app.use(bodyParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



mongoose.connect(str,{useNewUrlParser: true, useUnifiedTopology: true});
const con= mongoose.connection;
app.use(express.json());
try{
    con.on('open',() => {
        console.log('connected');
    })
}catch(error)
{
    console.log("Error: "+error);
}


app.get('/user/:id', async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.findOne({ _id: id })
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({message: error})
    }
})

app.get('/users', async (req, res) => {
    
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({message: error})
    }
    
})

app.put('/user/:id', async(req, res) => {
    const id = req.params.id
    try {
        const deleted = await User.deleteOne({ _id: id })
        res.status(200).json({ user: deleted })
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

app.patch('/update/:id', async(req, res) => {

    const id = req.params.id
    const updates = req.body
    const options = { new: true }
    try {
        const updated = await User.findByIdAndUpdate(id, updates, options)
        res.status(200).json({ 'message': updated })
    } catch (error) {
        res.status(400).json({ message: error })
    }
})


app.post('/create',
body('username').isLength({ min: 4, max: 15 }),
body('password').isLength({ min: 5}),
body('email').isEmail(),
body('isAdmin').isBoolean(),
async(req, res) => {
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
})

app.post('/login',
body('email').isEmail(),
body('password').isLength({ min: 5 }),
async(req, res) => {

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
})


app.listen(PORT, () => {
    console.log('server is app')
})