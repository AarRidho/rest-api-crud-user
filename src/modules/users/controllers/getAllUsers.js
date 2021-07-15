const usersService = require('../services');
const result = require('../../../utils/helpers/result');
const userData = require('../../../utils/helpers/formatters/userData');

module.exports = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();

        const data = users.map(user => userData(user));
        return result.response(res, 200, 'Success', data);
    } catch (error) {
        return result.error(res, error);
    }
};