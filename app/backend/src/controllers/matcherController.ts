import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Matchers } from '../interfaces/IMatchers';

export default class MatcherController {
  constructor(private matcherService: Matchers) {
    this.matcherService = matcherService;
  }

  async getAllMatchers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const matchers = await this.matcherService.getAllMatchers();
      return res.status(StatusCodes.OK).json(matchers);
    } catch (err) {
      next(err);
    }
  }
}
