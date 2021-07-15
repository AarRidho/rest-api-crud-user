const db = require('./db');

exports.init = () => {
    db.on('error', error => console.error(error));
    db.once('open', () => console.log('Connected to The Database'));
};

exports.db = db;