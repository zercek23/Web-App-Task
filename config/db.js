//FILENAME : db.js

const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const db = require('./keys').mongoURI;

const InitiateMongoServer = async () => {
    // Connect to Mongo
    await mongoose
        .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(err));
};

module.exports = InitiateMongoServer;