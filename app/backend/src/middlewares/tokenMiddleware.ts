import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as Jwt from 'jsonwebtoken';
import JWT from '../utils/jwt';

const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token must be a valid token' });
  }

  const payload = JWT.checkToken(token);

  const { data } = payload as Jwt.JwtPayload;

  req.body.user = data;

  next();
};

export default tokenMiddleware;
