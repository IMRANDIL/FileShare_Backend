const express = require('express');

const app = express();

require('dotenv').config();
const ConnectDb = require('./config/db')
ConnectDb()
const PORT = process.env.PORT || 3000;

//Routes....

app.use('/api/files', require('./routes/files'))





app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})