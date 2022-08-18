import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import Login from '../interfaces/ILogin';

export default class LoginController {
  constructor(private loginService: Login) {
    this.loginService = loginService;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const token = await this.loginService.login(req.body);
      return res.status(StatusCodes.OK).json({ token });
    } catch (err) {
      next(err);
    }
  }
}
