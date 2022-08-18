import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware: ErrorRequestHandler = async (err, _req, res, _next) => {
  const { status, message } = err;
  if (!status) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
  return res.status(status).json({ message });
};

export default errorMiddleware;
