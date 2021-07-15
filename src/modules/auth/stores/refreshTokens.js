let refreshTokens = {};

exports.getTokens = () => {
    return refreshTokens;
};

exports.getTokenById = (id) => {
    return refreshTokens[id]?.token;
};

exports.checkTokenExists = (id) => {
    return Object.prototype.hasOwnProperty.call(refreshTokens, id);
};

exports.saveToken = (id, data) => {
    refreshTokens[id] = {
        id: data.id,
        token: data.token,
        ip: data?.ip,
        userAgent: data?.userAgent
    };
};

exports.revokeTokenById = (id) => {
    delete refreshTokens[id];
};