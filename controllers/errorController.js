const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProd = (err, res) => {
  // Operational & truster error: send it to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown errors, don't leak error details to client
    // 1. Log error
    console.log('Error 💥', err);
    // 2. Send a generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorForProd(res);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
