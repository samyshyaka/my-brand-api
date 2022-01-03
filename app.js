const express = require("express");
const mongoose = require("mongoose");
const url = 'mongodb://localhost/ArticlesDBex'

const app = express();

mongoose.connect(url);
const con = mongoose.connection

con.on('open', ()=>{
    console.log("connected..")
})

app.use(express.json())

const ArticleRouter = require('./routes/articles')
const ProfileRouter = require('./routes/profiles')

app.use('/Articles', ArticleRouter)
app.use('/Profiles', ProfileRouter)

app.listen(9000, ()=>{
    console.log('server started')
})


