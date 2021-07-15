const bcrypt = require('bcrypt');
const db = require('./db');
const User = require('../../models/User');

exports.init = () => {
    db.on('error', error => console.error(error));
    db.once('open', async () => {
        console.log('Connected to The Database');
        let password = bcrypt.hashSync('123456', 10);
        const user = new User({ username: 'aarridho', email: 'aar.frontline@gmail.com', password, role: 'Admin' });

        await User.create(user);
    });
};

exports.db = db;