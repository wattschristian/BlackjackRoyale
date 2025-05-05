const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const GameHistoryModel = require('./models/GameHistory')
const UserModel = require('./models/User')


mongoose.connect("mongodb+srv://pady3w:JAjBZCIZYEXfHCOm@cluster0.e0sx8ta.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('Connect to database!')
}).catch(() => {
    console.log('Connection failed')
})


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))