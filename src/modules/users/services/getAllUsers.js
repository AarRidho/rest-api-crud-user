const users = require('../../../models/User');

const getAllUsers = () => {
    return users.find();
};

module.exports = getAllUsers;