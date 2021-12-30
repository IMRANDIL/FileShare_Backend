const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors')
require('dotenv').config();
const ConnectDb = require('./config/db');

//cors.....
// const corsOptions = {
//     origin: process.env.ALLOWED_CLIENTS.split(',')
//     //['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5500']
// }

// console.log(corsOptions.origin)

app.use(cors())



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