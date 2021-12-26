const mongoose = require('mongoose');
require('dotenv').config();
const connectDb = () => {
    //Database Connection..
    mongoose.connect(process.env.URI, {
        useNewUrlParser: true,

        useUnifiedTopology: true,

    });
    const connection = mongoose.connection;

    connection.once('open', () => {
        console.log(`Database Connected`);
    });

    connection.on('error', () => {
        console.log(`Database Connection Failed.`);
    })


}


module.exports = connectDb;