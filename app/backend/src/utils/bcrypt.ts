import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import HandleError from './handleError';

export default class Encrypty {
  static encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(5);
    const passwordHash = bcrypt.hashSync(password, salt);
    return passwordHash;
  }

  static checkPassword(password: string, passwordHash:string) {
    const isMatch = bcrypt.compareSync(password, passwordHash);

    if (!isMatch) {
      throw new HandleError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
  }
}
