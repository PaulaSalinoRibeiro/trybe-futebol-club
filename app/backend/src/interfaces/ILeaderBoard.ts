import { MatchersCreate } from './IMatchers';

export interface ILeaderBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export interface MatchesTeam {
  id: number,
  teamName: string,
  homeTeam: MatchersCreate[]
}

export default interface LeaderBoard {
  getFinishedMatchers(): Promise<any>
}
