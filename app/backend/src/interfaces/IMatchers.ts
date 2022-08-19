export default interface IMatchers {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}

export interface MatchersCreate {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}

export interface GoalsMatchers {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface Matchers {
  getAllMatchers(): Promise<IMatchers[]>
  create(data: MatchersCreate): Promise< MatchersCreate | void>
  updateProgress(id: number): Promise<void>
  updateGoals(id: number, data: GoalsMatchers): Promise<void>
}
