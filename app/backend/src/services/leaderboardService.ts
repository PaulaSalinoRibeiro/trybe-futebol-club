import Matches from '../database/models/matches';
import Team from '../database/models/team';

import { MatchersCreate } from '../interfaces/IMatchers';
import {
  MatchesTeamHome,
  ILeaderBoard,
  MatchesTeamAway,
  MatchesTeam,
} from '../interfaces/ILeaderBoard';

export default class LeaderBoardService {
  constructor(private model = Team) {
    this.model = model;
  }

  resultsGoalsHome = (matchers: MatchersCreate[]): number[] => {
    const goalsFavorHome = matchers
      .reduce((acc, curr: MatchersCreate) => acc + curr.homeTeamGoals, 0);

    const goalsOwnHome = matchers
      .reduce((acc, curr: MatchersCreate) => acc + curr.awayTeamGoals, 0);

    return [goalsFavorHome, goalsOwnHome];
  };

  resultsGoalsAway = (matchers: MatchersCreate[]): number[] => {
    const goalsFavorAway = matchers
      .reduce((acc, curr: MatchersCreate) => acc + curr.awayTeamGoals, 0);

    const goalsOwnAway = matchers
      .reduce((acc, curr: MatchersCreate) => acc + curr.homeTeamGoals, 0);

    return [goalsFavorAway, goalsOwnAway];
  };

  resultOfMatchersHome = (matchers: MatchersCreate[]): number[] => {
    let victoriesHome = 0;
    let drawsHome = 0;
    let lossesHome = 0;

    matchers.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) victoriesHome += 1;

      if (homeTeamGoals === awayTeamGoals) drawsHome += 1;

      if (homeTeamGoals < awayTeamGoals) lossesHome += 1;
    });

    const totalPoints = 3 * victoriesHome + drawsHome;

    return [victoriesHome, drawsHome, lossesHome, totalPoints];
  };

  resultOfMatchersAway = (matchers: MatchersCreate[]): number[] => {
    let victories = 0;
    let draws = 0;
    let losses = 0;

    matchers.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals < awayTeamGoals) victories += 1;

      if (homeTeamGoals === awayTeamGoals) draws += 1;

      if (homeTeamGoals > awayTeamGoals) losses += 1;
    });

    const totalPoints = 3 * victories + draws;

    return [victories, draws, losses, totalPoints];
  };

  formattedHome = ({ teamName, homeTeam }: MatchesTeamHome) => {
    const [
      victoriesHome, drawsHome, lossesHome, pointsHome,
    ] = this.resultOfMatchersHome(homeTeam);

    const [goalsFavorHome, goalsOwnHome] = this.resultsGoalsHome(homeTeam);
    return {
      name: teamName,
      totalPoints: pointsHome,
      totalGames: homeTeam.length,
      totalVictories: victoriesHome,
      totalDraws: drawsHome,
      totalLosses: lossesHome,
      goalsFavor: goalsFavorHome,
      goalsOwn: goalsOwnHome,
      goalsBalance: (goalsFavorHome - goalsOwnHome),
      efficiency: Number(((pointsHome / (homeTeam.length * 3)) * 100).toFixed(2)),
    };
  };

  formattedAway = ({ teamName, awayTeam }: MatchesTeamAway) => {
    const [
      victoriesAway, drawsAway, lossesAway, pointsAway,
    ] = this.resultOfMatchersAway(awayTeam);

    const [goalsFavorAway, goalsOwnAway] = this.resultsGoalsAway(awayTeam);
    return {
      name: teamName,
      totalPoints: pointsAway,
      totalGames: awayTeam.length,
      totalVictories: victoriesAway,
      totalDraws: drawsAway,
      totalLosses: lossesAway,
      goalsFavor: goalsFavorAway,
      goalsOwn: goalsOwnAway,
      goalsBalance: (goalsFavorAway - goalsOwnAway),
      efficiency: Number(((pointsAway / (awayTeam.length * 3)) * 100).toFixed(2)),
    };
  };

  formatted = ({ teamName, awayTeam, homeTeam }: MatchesTeam) => {
    const [victoriesHome, drawsHome, lossesHome, pointsHome] = this.resultOfMatchersHome(homeTeam);

    const [goalsFavorHome, goalsOwnHome] = this.resultsGoalsHome(homeTeam);

    const [victoriesAway, drawsAway, lossesAway, pointsAway] = this.resultOfMatchersAway(awayTeam);

    const [goalsFavorAway, goalsOwnAway] = this.resultsGoalsAway(awayTeam);

    return {
      name: teamName,
      totalPoints: pointsHome + pointsAway,
      totalGames: [...homeTeam, ...awayTeam].length,
      totalVictories: victoriesHome + victoriesAway,
      totalDraws: drawsHome + drawsAway,
      totalLosses: lossesHome + lossesAway,
      goalsFavor: goalsFavorHome + goalsFavorAway,
      goalsOwn: goalsOwnHome + goalsOwnAway,
      goalsBalance: ((goalsFavorHome + goalsFavorAway) - (goalsOwnHome + goalsOwnAway)),
      efficiency: Number(
        (((pointsHome + pointsAway) / ([...homeTeam, ...awayTeam].length * 3)) * 100).toFixed(2),
      ),
    };
  };

  // ref. https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields

  orderMatchers = (a: ILeaderBoard, b: ILeaderBoard) => {
    if (a.totalPoints < b.totalPoints) { return 1; }
    if (a.totalPoints > b.totalPoints) { return -1; }
    if (a.totalVictories < b.totalVictories) { return 1; }
    if (a.totalVictories > b.totalVictories) { return -1; }
    if (a.goalsBalance < b.goalsBalance) { return 1; }
    if (a.goalsBalance > b.goalsBalance) { return -1; }
    if (a.goalsFavor < b.goalsFavor) { return 1; }
    if (a.goalsFavor > b.goalsFavor) { return -1; }
    if (a.goalsOwn < b.goalsOwn) { return 1; }
    if (a.goalsOwn > b.goalsOwn) { return -1; }
    return 0;
  };

  async getFinishedMatchersHome(): Promise<ILeaderBoard[]> {
    const matchers = await this.model.findAll({
      include: [
        { model: Matches, as: 'homeTeam', where: { inProgress: 0 } },
      ],
    });

    const fineshedMatches = matchers as unknown as MatchesTeamHome[];

    const leaderBoardHome = fineshedMatches.map(this.formattedHome);

    return leaderBoardHome.sort(this.orderMatchers);
  }

  async getFinishedmatchersAway(): Promise<ILeaderBoard[]> {
    const matchers = await this.model.findAll({
      include: [
        { model: Matches, as: 'awayTeam', where: { inProgress: 0 } },
      ],
    });

    const fineshedMatches = matchers as unknown as MatchesTeamAway[];

    const leaderBoardHome = fineshedMatches.map(this.formattedAway);

    return leaderBoardHome.sort(this.orderMatchers);
  }

  async getFinishedMatchers(): Promise<ILeaderBoard[]> {
    const matchers = await this.model.findAll({
      include: [
        { model: Matches, as: 'awayTeam', where: { inProgress: 0 } },
        { model: Matches, as: 'homeTeam', where: { inProgress: 0 } },
      ],
    });

    const fineshedMatches = matchers as unknown as MatchesTeam[];

    const leadeBoard = fineshedMatches.map(this.formatted);

    return leadeBoard.sort(this.orderMatchers);
  }
}
