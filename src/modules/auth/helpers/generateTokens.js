const jwt = require('jsonwebtoken');
const CONSTANTS = require('../../../constants/tokens');

exports.generateAccessToken = async (payloadAccess) => {
    //generating acess token
    return jwt.sign(payloadAccess, CONSTANTS.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
};

exports.generateRefreshToken = async (payloadRefresh) => {
    //generating refresh token
    return jwt.sign(payloadRefresh, CONSTANTS.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
};