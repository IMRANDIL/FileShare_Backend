const express = require('express');

const app = express();
const path = require('path')
require('dotenv').config();
const ConnectDb = require('./config/db')
ConnectDb()
const PORT = process.env.PORT || 3000;

//Template Engine..
app.use(express.json())
app.use(express.static('public'))

app.set('views', path.join(__dirname, '/views'));

app.set('view engine', 'ejs')


//Routes....

app.use('/api/files', require('./routes/files'))

app.use('/files', require('./routes/show'));

app.use('/files/download', require('./routes/download'))

app.get('/', (req, res) => {
    return res.send(`<h1 style="text-align:center">File Sharing App</h1>`)
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})