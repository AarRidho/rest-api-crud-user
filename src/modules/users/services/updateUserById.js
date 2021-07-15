const User = require('../../../models/User');

const updateUser = async (id, data) => {
    return await User.findOneAndUpdate({ _id: id }, data, { new: true });
};

module.exports = updateUser;