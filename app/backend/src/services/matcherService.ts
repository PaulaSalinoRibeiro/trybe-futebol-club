import Team from '../database/models/team';
import Matches from '../database/models/matches';

import IMatchers from '../interfaces/IMatchers';

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

  // async getByFilter(query: string): Promise<IMatchers[]> {
  //   const matchers = await this.model.findAll({
  //     where: {
  //       inProgress: query,
  //     },
  //     include: [
  //       { model: Team, as: 'teamHome', attributes: ['teamName'] },
  //       { model: Team, as: 'teamAway', attributes: ['teamName'] },
  //     ],
  //   });
  //   return matchers as unknown as IMatchers[];
  // }
}
