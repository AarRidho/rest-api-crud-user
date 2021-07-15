const bcrypt = require('bcrypt');
const requestIp = require('@supercharge/request-ip');

const authService = require('../services');
const result = require('../../../utils/helpers/result');
const { generateAccessToken, generateRefreshToken } = require('../helpers/generateTokens');
const { saveToken, /* getTokens */ } = require('../stores/refreshTokens');

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if user exists
        let user = await authService.getByUsername(username);
        if (!user) throw { message: 'Unauthorized', status: 401 };

        // check if user.password match with password from request
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw { message: 'Unauthorized', status: 401 };

        // delete user.password from var
        delete user.password;

        //define payloads
        let payloadAccess = {
            ...user,
            id: user._id,
        };
        delete payloadAccess._id;

        const ip = requestIp.getClientIp(req);
        const payloadRefresh = {
            id: user._id, ip
        };

        //generate tokens
        const accessToken = await generateAccessToken(payloadAccess);
        const refreshToken = await generateRefreshToken(payloadRefresh);

        //save refreshToken
        saveToken(refreshToken, { ...payloadRefresh, token: refreshToken });

        return result.response(res, 200, 'Success', { accessToken, refreshToken });
    } catch (error) {
        console.log(error);
        return result.error(res, error);
    }
};