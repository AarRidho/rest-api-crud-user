const result = require('../../../utils/helpers/result');
const { revokeTokenById } = require('../stores/refreshTokens');

module.exports = async (req, res) => {
    try {
        //check if refreshToken exists
        const { refreshToken = null } = req.body;
        if (!refreshToken) throw { message: 'Token not provided', status: 401 };

        revokeTokenById(refreshToken);

        return result.response(res, 200, 'Success');
    } catch (error) {
        return result.error(res, error);
    }
};