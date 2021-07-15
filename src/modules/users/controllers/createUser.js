const usersService = require('../services');
const result = require('../../../utils/helpers/result');
const userData = require('../../../utils/helpers/formatters/userData');
const hashPassword = require('../../../utils/helpers/hashPassword');

module.exports = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, role } = req.body;
        if (password !== confirmPassword) throw { message: 'Confirmation Password is not the same', status: 400 };

        const checkIfUserExists = await usersService.findOne({ username });
        if (checkIfUserExists) throw { message: 'Username already exists', status: 400 };

        const hashedPassword = await hashPassword(password, 10);

        const newData = {
            username,
            password: hashedPassword,
            email,
            role,
        };

        await usersService.createUser(newData);
        const user = await usersService.findOne({ username });

        const data = userData(user);
        return result.response(res, 200, 'Success', data);
    } catch (error) {
        return result.error(res, error);
    }
};