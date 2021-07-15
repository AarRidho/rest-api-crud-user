const bcrypt = require('bcrypt');
const users = require('../../models/users');
const { db, init } = require('../../lib/mongoose');

init();

exports.up = async () => {
    /*
        Code your update script here!
     */

    try {
        await users.createCollection();

        let password = bcrypt.hashSync('123456', 10);

        await users.insertMany([
            { username: 'aarridho', email: 'aar.frontline@gmail.com', password },
        ]);

        console.log('done migrating users!');

    } catch (error) {
        console.error(error);
        console.log('error migrating users!');
    }
};

exports.down = async () => {
    /*
        Code your downgrade script here!
     */

    try {
        await db.dropCollection('users');
        console.log('done downgrading users!');
    } catch (error) {
        console.log('error downgrading users!');
    }
};