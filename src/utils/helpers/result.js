exports.response = (res, code = 400, message = '', data = null) => res.status(code).json({
    code,
    message,
    data,
});

exports.error = (res, error, data = null) => {
    const code = typeof error?.code === 'number' ? error.code : 500;
    const message = error.message || 'Internal Server Error';
    return res.status(code).json({
        code,
        message,
        data,
    });
};