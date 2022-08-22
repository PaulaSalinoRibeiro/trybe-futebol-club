import Matches from '../database/models/matches';
import Team from '../database/models/team';

import { MatchersCreate } from '../interfaces/IMatchers';
import { MatchesTeam, ILeaderBoard, MatchesTeamAway } from '../interfaces/ILeaderBoard';

export default class LeaderBoardService {
  constructor(private model = Team) {
    this.model = model;
  }

  static resultsGoalsHome(matchers: MatchersCreate[]): number[] {
    const goalsFavorHome = matchers
      .reduce((acc, curr: MatchersCreate) => acc + curr.homeTeamGoals, 0);

    const goalsOwnHome = matchers
      .reduce((acc, curr: MatchersCreate) => acc + curr.awayTeamGoals, 0);

    return [goalsFavorHome, goalsOwnHome];
  }

  static resultsGoalsAway(matchers: MatchersCreate[]): number[] {
    const goalsFavorAway = matchers
      .reduce((acc, curr: MatchersCreate) => acc + curr.awayTeamGoals, 0);

    const goalsOwnAway = matchers
      .reduce((acc, curr: MatchersCreate) => acc + curr.homeTeamGoals, 0);

    return [goalsFavorAway, goalsOwnAway];
  }

  static resultOfMatchersHome(matchers: MatchersCreate[]): number[] {
    let victories = 0;
    let draws = 0;
    let losses = 0;

    matchers.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) victories += 1;

      if (homeTeamGoals === awayTeamGoals) draws += 1;

      if (homeTeamGoals < awayTeamGoals) losses += 1;
    });

    const totalPoints = 3 * victories + draws;

    return [victories, draws, losses, totalPoints];
  }

  static resultOfMatchersAway(matchers: MatchersCreate[]): number[] {
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
  }

  static formattedHome({ teamName, homeTeam }: MatchesTeam) {
    const [
      victoriesHome, drawsHome, lossesHome, pointsHome,
    ] = LeaderBoardService.resultOfMatchersHome(homeTeam);

    const [goalsFavorHome, goalsOwnHome] = LeaderBoardService.resultsGoalsHome(homeTeam);
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
  }

  static formattedAway({ teamName, awayTeam }: MatchesTeamAway) {
    const [
      victoriesHome, drawsHome, lossesHome, pointsHome,
    ] = LeaderBoardService.resultOfMatchersAway(awayTeam);

    const [goalsFavorAway, goalsOwnAway] = LeaderBoardService.resultsGoalsAway(awayTeam);
    return {
      name: teamName,
      totalPoints: pointsHome,
      totalGames: awayTeam.length,
      totalVictories: victoriesHome,
      totalDraws: drawsHome,
      totalLosses: lossesHome,
      goalsFavor: goalsFavorAway,
      goalsOwn: goalsOwnAway,
      goalsBalance: (goalsFavorAway - goalsOwnAway),
      efficiency: Number(((pointsHome / (awayTeam.length * 3)) * 100).toFixed(2)),
    };
  }

  // ref. https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields

  static orderMatchers(a: ILeaderBoard, b: ILeaderBoard) {
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
  }

  async getFinishedMatchersHome(): Promise<ILeaderBoard[]> {
    const matchers = await this.model.findAll({
      include: [
        { model: Matches, as: 'homeTeam', where: { inProgress: 0 } },
      ],
    });

    const fineshedMatches = matchers as unknown as MatchesTeam[];

    const leaderBoardHome = fineshedMatches.map(LeaderBoardService.formattedHome);

    return leaderBoardHome.sort(LeaderBoardService.orderMatchers);
  }

  async getFinishedmatchersAway(): Promise<ILeaderBoard[]> {
    const matchers = await this.model.findAll({
      include: [
        { model: Matches, as: 'awayTeam', where: { inProgress: 0 } },
      ],
    });

    const fineshedMatches = matchers as unknown as MatchesTeamAway[];

    const leaderBoardHome = fineshedMatches.map(LeaderBoardService.formattedAway);

    return leaderBoardHome.sort(LeaderBoardService.orderMatchers);
  }
}
