require('dotenv').config();

const mongoose = require('mongoose');

const { MONGO_INITDB_URL, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_INITDB_NAME } = process.env;

mongoose.connect('mongodb://' + MONGO_INITDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: MONGO_INITDB_ROOT_USERNAME,
    pass: MONGO_INITDB_ROOT_PASSWORD,
    dbName: MONGO_INITDB_NAME,
    useFindAndModify: false,
});

const db = mongoose.connection;

console.log(MONGO_INITDB_URL);

module.exports = db;