export function errorHandler(err, req, res, next) {
  // eslint-disable-line no-unused-vars
  const status = err.statusCode || 500;

  if (status === 500) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: Object.values(err.errors || {}).map((e) => e.message),
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Duplicate key error',
    });
  }

  return res.status(status).json({
    success: false,
    message: err.message || 'Server error',
  });
}

