import Team from '../database/models/team';

import ITeam from '../interfaces/ITeam';

export default class TeamService {
  constructor(private model = Team) {
    this.model = model;
  }

  async listAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const team = await this.model.findOne({ where: { id } });
    return team;
  }
}
