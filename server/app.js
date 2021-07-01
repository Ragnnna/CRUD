const express = require('express')
const cors = require('cors')
const { body } = require('express-validator')
require('dotenv').config()
const app = express()
const bodyParser = require('body-parser')

const mongooseConnect = require('./connections/mongooseConnect')
const getHandlers = require('./handlers/getHandlers')
const patchHandlers = require('./handlers/patchHanders')
const putHandlers = require('./handlers/putHandlers')
const postHandlers = require('./handlers/postHandlers')


const PORT = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongooseConnect.mongooseConnect()

app.get('/user/:id', async(req, res) => {
    await getHandlers.fetchUser(req, res)
})

app.get('/users', async (req, res) => {
    await getHandlers.fetchUsers(req, res)
})

app.put('/user/:id', async(req, res) => {
    await putHandlers.deleteUser(req, res)
})

app.patch('/update/:id', async(req, res) => {
    await patchHandlers.updateUser(req, res)
})


app.post('/create',
body('username').isLength({ min: 4, max: 15 }),
body('password').isLength({ min: 5}),
body('email').isEmail(),
body('isAdmin').isBoolean(),
async(req, res) => {
    await postHandlers.createProfile(req, res)
})

app.post('/login',
body('email').isEmail(),
body('password').isLength({ min: 5 }),
async(req, res) => {
    await postHandlers.loginProfile(req, res)
})


app.listen(PORT, () => {
    console.log('server is app')
})