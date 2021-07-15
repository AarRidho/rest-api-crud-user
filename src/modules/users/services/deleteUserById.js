const User = require('../../../models/User');

const deleteUserById = async (id) => {
    return await User.findOneAndDelete({ _id: id });
};

module.exports = deleteUserById;