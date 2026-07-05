const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'TokenExpiredError') {
        err.statusCode = 401;
        err.message = 'Token has expired. Please log in again.';
    } else if (err.name === 'JsonWebTokenError') {
        err.statusCode = 401;
        err.message = 'Invalid token.';
    }

    const message = err.message || 'Internal Server Error';
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        message,
        status: statusCode
    });
}

module.exports = errorHandler;