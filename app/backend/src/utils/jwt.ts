import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import HandleError from './handleError';

import IUser from '../interfaces/IUser';

dotenv.config();

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class JWT {
  static createToken(payload: Omit<IUser, 'password'>): string {
    const jwtConfig:jwt.SignOptions = {
      expiresIn: '30d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: payload }, secret, jwtConfig);
    return token;
  }

  static checkToken(token: string) {
    try {
      const payload = jwt.verify(token, secret);
      return payload;
    } catch (err) {
      throw new HandleError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }
  }
}
