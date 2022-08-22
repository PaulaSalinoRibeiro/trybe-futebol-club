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

export interface MatchesTeamHome {
  id?: number,
  teamName: string,
  homeTeam: MatchersCreate[]
}

export interface MatchesTeamAway {
  id?: number,
  teamName: string,
  awayTeam: MatchersCreate[]
}

export interface MatchesTeam {
  id?: number,
  teamName: string,
  homeTeam: MatchersCreate[],
  awayTeam: MatchersCreate[]
}

export default interface LeaderBoard {
  getFinishedMatchersHome(): Promise<ILeaderBoard[]>
  getFinishedmatchersAway(): Promise<ILeaderBoard[]>
  getFinishedMatchers(): Promise<ILeaderBoard[]>
}
