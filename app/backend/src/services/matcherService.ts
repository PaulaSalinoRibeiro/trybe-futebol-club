import { StatusCodes } from 'http-status-codes';
import Team from '../database/models/team';
import Matches from '../database/models/matches';
import HandleError from '../utils/handleError';

import IMatchers, { GoalsMatchers, MatchersCreate } from '../interfaces/IMatchers';

export default class MatcherService {
  constructor(private model = Matches) {
    this.model = model;
  }

  async getAllMatchers(): Promise<IMatchers[]> {
    const matchers = await this.model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matchers as unknown as IMatchers[];
  }

  async create(data: MatchersCreate): Promise<MatchersCreate> {
    if (data.homeTeam === data.awayTeam) {
      throw new HandleError(
        StatusCodes.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    }

    const homeTeam = await Team.findOne({ where: { id: data.homeTeam } });

    const awayTeam = await Team.findOne({ where: { id: data.awayTeam } });

    if (!homeTeam || !awayTeam) {
      throw new HandleError(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }

    const newMatcher = await this.model.create({ ...data, inProgress: 1 });

    return newMatcher;
  }

  async updateProgress(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateGoals(id: number, data: GoalsMatchers): Promise<void> {
    await this.model.update({ ...data }, { where: { id } });
  }
}
