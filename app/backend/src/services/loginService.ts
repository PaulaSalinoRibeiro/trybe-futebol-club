import * as Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import User from '../database/models/user';
import HandleError from '../utils/handleError';
import Encrypty from '../utils/bcrypt';
import JWT from '../utils/jwt';

import Login, { LoginData } from '../interfaces/ILogin';

export default class LoginService implements Login {
  constructor(private model = User) {
    this.model = model;
  }

  async login(data: LoginData): Promise<string | void> {
    LoginService.validated(data);

    const user = await this.model.findOne({ where: { email: data.email } });

    if (!user) throw new HandleError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');

    Encrypty.checkPassword(data.password, user.password);

    const token = JWT.createToken(user);

    return token;
  }

  static validated(data: LoginData): void {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(data);

    if (error) throw new HandleError(StatusCodes.BAD_REQUEST, 'All fields must be filled');
  }
}
