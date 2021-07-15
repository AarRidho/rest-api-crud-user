const User = require('../../../models/User');

const findById = (id) => {
    return User.findById(id);
};

module.exports = findById;