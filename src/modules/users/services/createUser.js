const User = require('../../../models/User');

const createUser = async (data) => {
    const user = new User(data);

    return await user.save();
};

module.exports = createUser;