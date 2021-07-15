const usersService = require('../services');
const result = require('../../../utils/helpers/result');
const userData = require('../../../utils/helpers/formatters/userData');
const ROLES = require('../../../constants/roles');

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.role !== ROLES.ADMIN && req.user._id.toString() !== id) throw { message: 'Unauthorized', status: 401 };

        const user = await usersService.findById(id);
        if (!user) throw { message: 'User Not Found', status: 401 };

        await usersService.deleteUserById(id);

        const data = userData(user);
        return result.response(res, 200, 'Success Deleting', { deleted: data });
    } catch (error) {
        return result.error(res, error);
    }
};