import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Matchers } from '../interfaces/IMatchers';

export default class MatcherController {
  constructor(private matcherService: Matchers) {
    this.matcherService = matcherService;
  }

  async getAllMatchers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      console.log('passou pelo controller');
      const matchers = await this.matcherService.getAllMatchers();
      console.log(matchers);
      return res.status(StatusCodes.OK).json(matchers);
    } catch (err) {
      next(err);
    }
  }
}
