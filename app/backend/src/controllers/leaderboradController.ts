import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import LeaderBoard from '../interfaces/ILeaderBoard';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoard) {
    this.leaderBoardService = leaderBoardService;
  }

  async getFinishedMatchers(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const leaderBoard = await this.leaderBoardService.getFinishedMatchers();
      return res.status(StatusCodes.OK).json(leaderBoard);
    } catch (err) {
      next(err);
    }
  }
}
