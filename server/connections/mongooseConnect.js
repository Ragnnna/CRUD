const mongoose = require('mongoose')
const express = require('express')
const app = express()
const str = process.env.MONGO_KEY

const mongooseConnect = () => {
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
}

module.exports = {
    mongooseConnect
}