const users = require('../../../models/User');

const findOne = (params) => {
    return users.findOne(params);
};

module.exports = findOne;