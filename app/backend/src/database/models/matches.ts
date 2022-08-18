import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './team';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

Team.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeTeam' });
Matches.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });

Team.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayTeam' });
Matches.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
