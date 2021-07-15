const jwt = require('jsonwebtoken');

const CONSTANT = require('../../../constants/tokens');
const result = require('../../../utils/helpers/result');
const { getTokenById, revokeTokenById, /* getTokens */ } = require('../stores/refreshTokens');
const { generateAccessToken } = require('../helpers/generateTokens');

module.exports = async (req, res) => {
    try {
        //check if refreshToken exists
        const { refreshToken = null } = req.body;
        if (!refreshToken) throw { message: 'Token not provided', status: 401 };

        // console.log(getTokens());
        // console.log(refreshToken);

        //decode token
        const decoded = jwt.verify(refreshToken, CONSTANT.REFRESH_TOKEN_SECRET);
        let payload = { ...decoded };
        delete payload.iat;
        delete payload.exp;

        //get token from store
        const refreshTokenFromStore = getTokenById(refreshToken);
        if (!refreshTokenFromStore) throw { message: 'Token is Expired', status: 401 };

        //generate new accessToken
        const newAccessToken = await generateAccessToken(payload);

        return result.response(res, 200, 'Success', { accessToken: newAccessToken });
    } catch (error) {
        console.log(error);
        //if token failed to be verified
        if (error?.name === 'TokenExpiredError') {
            revokeTokenById(req.body.refreshToken);
            return result.error(res, { message: 'Token Expired', status: 401 });
        }

        return result.error(res, error);
    }
};