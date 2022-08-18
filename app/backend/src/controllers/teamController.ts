import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Team } from '../interfaces/ITeam';

export default class TeamController {
  constructor(private teamService: Team) {
    this.teamService = teamService;
  }

  async listAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const teams = await this.teamService.listAll();
      return res.status(StatusCodes.OK).json(teams);
    } catch (err) {
      next(err);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const team = await this.teamService.findById(Number(req.params.id));
      if (!team) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Not Found' });
      }

      return res.status(StatusCodes.OK).json(team);
    } catch (err) {
      next(err);
    }
  }
}
