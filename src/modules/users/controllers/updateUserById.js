const usersService = require('../services');
const result = require('../../../utils/helpers/result');
const userData = require('../../../utils/helpers/formatters/userData');
const ROLES = require('../../../constants/roles');
const hashPassword = require('../../../utils/helpers/hashPassword');

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.role !== ROLES.ADMIN && req.user._id.toString() !== id) throw { message: 'Unauthorized', status: 401 };

        const { username = null, role = null, email = null, password = null } = req.body;
        let updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (role && req.user.role === ROLES.ADMIN) updateData.role = role;
        if (password) updateData.password = await hashPassword(password, 10);

        const user = await usersService.updateUserById(id, updateData);
        if (!user) throw { message: 'User Not Found', status: 404 };

        const data = userData(user);
        return result.response(res, 200, 'Success', data);
    } catch (error) {
        console.log(error);
        if (error.codeName === 'DuplicateKey') return result.error(res, { message: 'Duplicate Key', status: 400 });
        return result.error(res, error);
    }
};