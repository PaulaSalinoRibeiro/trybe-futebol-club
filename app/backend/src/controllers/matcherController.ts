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

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const newMatcher = await this.matcherService.create(req.body);
      return res.status(StatusCodes.CREATED).json(newMatcher);
    } catch (err) {
      next(err);
    }
  }

  async updateProgress(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.matcherService.updateProgress(Number(req.params.id));
      return res.status(StatusCodes.OK).json({ message: 'Finished' });
    } catch (err) {
      next(err);
    }
  }

  async updateGoals(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.matcherService.updateGoals(Number(req.params.id), req.body);
      return res.status(StatusCodes.OK).json({ message: 'Updated!' });
    } catch (err) {
      next(err);
    }
  }
}
