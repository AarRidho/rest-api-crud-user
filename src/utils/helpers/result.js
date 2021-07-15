exports.response = (res, status = 400, message = '', data = null) => res.status(status).json({
    status,
    message,
    data,
});

exports.error = (res, error, data = null) => {
    const status = typeof error?.status === 'number' ? error.status : 500;
    const message = error.message || 'Internal Server Error';
    return res.status(status).json({
        status,
        message,
        data,
    });
};