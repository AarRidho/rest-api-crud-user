const User = require('../../../models/User');

const getByUsername = (username) => User.findOne({ username }).exec();

module.exports = getByUsername;